import { Router, type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { prismaClient } from "../db";
import { authMiddleware } from "../middleware";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

const GOOGLE_DRIVE_SCOPE = "https://www.googleapis.com/auth/drive";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const GOOGLE_DOCS_SCOPE = "https://www.googleapis.com/auth/documents";

router.get(
  "/oauth/:serviceName",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { serviceName } = req.params;
    // @ts-ignore
    const userId = req.id;

    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    const scope =
      serviceName === "drive"
        ? GOOGLE_DRIVE_SCOPE
        : serviceName === "calendar"
        ? GOOGLE_CALENDAR_SCOPE
        : GOOGLE_DOCS_SCOPE;

    const state = jwt.sign({ userId, serviceName }, JWT_PASSWORD, {
      expiresIn: "1h",
    });

    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope,
      state,
    });

    res.json({ url: authorizeUrl });
  }
);

router.get("/redirect", async (req: Request, res: Response) => {
  const { code, state } = req.query;

  if (!code || typeof code !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid authorization code" });
  }

  if (!state || typeof state !== "string") {
    return res.status(400).json({ error: "Missing or invalid state" });
  }

  try {
    const decodedState = jwt.verify(state, JWT_PASSWORD) as {
      userId: number;
      serviceName: string;
    };
    const { userId, serviceName } = decodedState;
    console.log(serviceName, userId)

    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    const { tokens } = await oauth2Client.getToken(code);

    const externalApp = await prismaClient.externalApp.findFirst({
      where: { name: serviceName },
    });
    console.log(externalApp)

    if (!externalApp) {
      return res.status(404).json({ error: "External app not found" });
    }

    await prismaClient.externalAppUser.upsert({
      where: {
        userId_externalAppId: {
          userId,
          externalAppId: externalApp.id,
        },
      },
      update: {
        accessToken: tokens.access_token as string,
        refreshToken: tokens.refresh_token as string,
        expiresAt: new Date(tokens.expiry_date!),
      },
      create: {
        userId,
        externalAppId: externalApp.id,
        accessToken: tokens.access_token as string,
        refreshToken: tokens.refresh_token as string,
        expiresAt: new Date(tokens.expiry_date!),
      },
    });

    // res.status(200).json({ message: "Connected successfully" });

    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/zap/create`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export const googleRouter = router;
