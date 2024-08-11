import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import type { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parser";

const TOPIC_NAME = "zap-events";
const prismaClient = new PrismaClient();
const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });

  await consumer.connect();

  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) {
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log("Action not found");
        return;
      }
      const zapMetadata = zapRunDetails?.metadata;
      if (currentAction.type.id === "email") {
        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string,
          zapMetadata
        );
        const to = parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapMetadata
        );
        console.log(`Sending out an email ${to} body is ${body}`);
      }
      if (currentAction.type.id === "send-sol") {
        const amount = parse(
          (currentAction.metadata as JsonObject)?.amount as string,
          zapMetadata
        );
        const address = parse(
          (currentAction.metadata as JsonObject)?.address as string,
          zapMetadata
        );
        console.log(`Sendin ${amount} to ${address}`);
      }

      await new Promise((r) => setTimeout(r, 1000));

      const zapId = message.value.toString();
      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapId,
              }),
            },
          ],
        });
      }
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}
main();
