import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignInSchema, SignUpSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignUpSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      // TODO
      password: parsedData.data.password,
    },
  });

  return res.status(200).json({ message: "User Signed Up Successfully!" });
});
router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SignInSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Credentials Incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  return res.status(200).json({
    token
  })
});

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id

    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    })

    return res.status(200).json({ user })
});

export const userRouter = router;
