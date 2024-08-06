import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
app.use(express.json())

const client = new PrismaClient();
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  // store in db a new trigger

  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metadata: body
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  return res.json({
    message: "Webhook recieved"
  })


  // push in on to a queue (kafka/redis)
});


app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})