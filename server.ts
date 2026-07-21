import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", appName: "The Detail Dude" });
  });

  // AI Vehicle Detailing Advice Endpoint
  app.post("/api/quote-consultant", async (req, res) => {
    try {
      const {
        vehicleYear,
        vehicleMake,
        vehicleModel,
        paintColor,
        condition,
        concern,
        serviceGoal,
      } = req.body;

      const ai = getGenAI();

      if (!ai) {
        return res.json({
          recommendation: `Based on your ${vehicleYear || ''} ${vehicleMake || ''} ${vehicleModel || ''}, we recommend our **Stage 1 Paint Correction & 3-Year Ceramic Coating Package**. This removes light swirl marks, restores clarity to ${paintColor || 'your paint'}, and locks in hydrophobic protection.`,
          recommendedPackage: "Paint Correction & Ceramic Shield",
          estimatedTime: "5 - 7 Hours",
          proTip: "Avoid automatic drive-thru tunnel washes with spinning brushes to maintain clear coat depth and prevent swirl marks.",
        });
      }

      const prompt = `You are Trevor Ehrenholz, owner and master detailer of "The Detail Dude" mobile automotive detailing in Alberta.
A prospective client has requested expert advice on their vehicle:
- Vehicle: ${vehicleYear || 'N/A'} ${vehicleMake || 'N/A'} ${vehicleModel || 'N/A'}
- Paint Color: ${paintColor || 'Not specified'}
- Paint / Interior Condition: ${condition || 'Normal wear'}
- Primary Concern: ${concern || 'General detailing & protection'}
- Service Goal: ${serviceGoal || 'High gloss & long-term protection'}

Provide a friendly, highly professional, master-detailer breakdown for this client in clean JSON format:
{
  "recommendation": "detailed direct advice as Trevor explaining what treatment will yield the best gloss and swirl removal for this specific car and color",
  "recommendedPackage": "exact package name, e.g., 'Stage 1 Paint Correction + 3-Yr Ceramic Coating' or 'Mobile Platinum Detail' or 'Stage 2 Multi-Step Polishing'",
  "estimatedTime": "estimated duration, e.g. 4-6 Hours",
  "proTip": "a high-value pro detailing tip specific to this vehicle make or paint color"
}
Return ONLY valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      return res.json(parsed);
    } catch (error: any) {
      console.error("Error generating quote consultation:", error);
      return res.status(500).json({
        error: "Failed to generate recommendation",
        details: error?.message || "Unknown error",
      });
    }
  });

  // Contact submission mock endpoint
  app.post("/api/contact", (req, res) => {
    const { name, phone, email, vehicle, packageSelected, message } = req.body;
    console.log("New Detailing Inquiry Received:", { name, phone, email, vehicle, packageSelected, message });
    res.json({
      success: true,
      message: `Thanks ${name || 'there'}! Trevor at The Detail Dude received your request and will follow up shortly at ${phone || email || '780-674-0956'}.`,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Detail Dude server running on http://localhost:${PORT}`);
  });
}

startServer();
