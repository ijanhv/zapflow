import { Router, type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { prismaClient } from "../db";
import { authMiddleware } from "../middleware";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { google } from "googleapis";

const router = Router();

const GOOGLE_SCOPES = {
  drive: "https://www.googleapis.com/auth/drive",
  calendar: "https://www.googleapis.com/auth/calendar",
  docs: "https://www.googleapis.com/auth/documents",
  gmail:[ "https://www.googleapis.com/auth/gmail.send", "https://www.googleapis.com/auth/gmail.compose", "https://www.googleapis.com/auth/gmail.readonly"],
};

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const getExternalApp = async (name: string) => {
  const externalApp = await prismaClient.externalApp.findFirst({ where: { name } });
  if (!externalApp) throw new Error("External app not found");
  return externalApp;
};

const getExternalAppUser = async (userId: number, externalAppId: string) => {
  const externalAppUser = await prismaClient.externalAppUser.findUnique({
    where: { userId_externalAppId: { userId, externalAppId } },
  });
  if (!externalAppUser) throw new Error("External app user not found");
  return externalAppUser;
};

const setOAuth2Credentials = (accessToken: string, refreshToken: string) => {
  oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
};

router.get("/oauth/:serviceName", authMiddleware, async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  const userId = (req as any).id;

  const scope = GOOGLE_SCOPES[serviceName as keyof typeof GOOGLE_SCOPES];
  if (!scope) return res.status(400).json({ error: "Invalid service name" });

  const state = jwt.sign({ userId, serviceName }, JWT_PASSWORD, { expiresIn: "1h" });
  const authorizeUrl = oauth2Client.generateAuthUrl({ access_type: "offline", scope, state });

  res.json({ url: authorizeUrl });
});

router.get("/redirect", async (req: Request, res: Response) => {
  const { code, state } = req.query;

  if (typeof code !== "string" || typeof state !== "string") {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  try {
    const { userId, serviceName } = jwt.verify(state, JWT_PASSWORD) as { userId: number; serviceName: string };
    const { tokens } = await oauth2Client.getToken(code);

   const externalApp = await prismaClient.externalApp.findFirst({ where: { name: serviceName } });

   if (!externalApp) {
    return res.status(404).json({ error: "External app not found" });
  }

    await prismaClient.externalAppUser.upsert({
      where: { userId_externalAppId: { userId, externalAppId: externalApp.id } },
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

    res.redirect(`${process.env.FRONTEND_URL}/dashboard/zap/create`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/drive/folders", authMiddleware, async (req, res) => {
  try {
    const userId = parseInt((req as any).id);
    const externalApp = await getExternalApp("drive");
    const externalAppUser = await getExternalAppUser(userId, externalApp.id);

    setOAuth2Credentials(externalAppUser.accessToken, externalAppUser.refreshToken);

    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const response = await drive.files.list({
      pageSize: 10,
      fields: "nextPageToken, files(id, name, mimeType)",
      q: "'root' in parents",
    });

    res.json({ success: true, message: "Files fetched successfully!", folders: response.data.files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

router.get("/user/:appName", authMiddleware, async (req, res) => {
  
  try {
    const appName = req.params.appName
    console.error(appName)
    const userId = parseInt((req as any).id);
    const externalApp = await getExternalApp(appName);
    const externalAppUser = await getExternalAppUser(userId, externalApp.id);

    setOAuth2Credentials(externalAppUser.accessToken, externalAppUser.refreshToken);

    let userInfo;

    switch (appName) {
      case 'drive':
        const drive = google.drive({ version: "v3", auth: oauth2Client });
        const response = await drive.about.get({ fields: "user(emailAddress)" });
        // const driveResponse = await drive.about.get({ fields: 'user(emailAddress, displayName)' });
        userInfo = response.data.user?.emailAddress
        break;

      case 'calendar':
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const calendarResponse = await calendar.calendarList.list();
        userInfo = { email: calendarResponse.data.items?.[0]?.id };
        break;

      case 'docs':
        const docs = google.docs({ version: 'v1', auth: oauth2Client });
        const docsResponse = await docs.documents.get({ documentId: 'root' });
        // userInfo = { email: docsResponse.config.headers['Authorization'] };
        break;

      case 'gmail':
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        const gmailResponse = await gmail.users.getProfile({ userId: 'me' });

        userInfo =  gmailResponse.data.emailAddress
        break;

      default:
        throw new Error('Unsupported app');
    }

   
    res.json({ success: true, email: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch email" });
  }
});

export const googleRouter = router;