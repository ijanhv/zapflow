import { Router } from "express";
import { prismaClient } from "../db";
const router = Router();

router.get("/available", async (req,res) => {
    const availableTriggers = await prismaClient.availableTrigger.findMany({})

    return res.status(200).json({ availableTriggers })
})

export const triggerRouter = router;
