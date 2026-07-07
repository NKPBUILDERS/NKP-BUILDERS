import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import { servicesData, projectsData, blogData, testimonialsData, faqData } from "./src/data";

dotenv.config();

const currentDir = typeof __dirname !== "undefined"
  ? __dirname
  : typeof import.meta.url !== "undefined"
    ? path.dirname(fileURLToPath(import.meta.url))
    : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Database initialization
  const DB_FILE = path.join(process.cwd(), "data-store.json");
  let dbData = {
    services: servicesData,
    projects: projectsData,
    blogs: blogData,
    testimonials: testimonialsData,
    faqs: faqData
  };

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      dbData = {
        services: parsed.services || servicesData,
        projects: parsed.projects || projectsData,
        blogs: parsed.blogs || blogData,
        testimonials: parsed.testimonials || testimonialsData,
        faqs: parsed.faqs || faqData
      };
    } catch (err) {
      console.error("Failed to parse data-store.json, using defaults:", err);
    }
  } else {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), "utf-8");
      console.log("Initialized data-store.json with default datasets.");
    } catch (err) {
      console.error("Failed to write initial data-store.json:", err);
    }
  }

  // Initialize Gemini API client if key exists
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. AI Chat will run in simulated mode.");
  }

  // --- API Routes ---

  // Get complete dynamic database content
  app.get("/api/content", (req, res) => {
    res.json(dbData);
  });

  // Service list metadata (Ground truth for NKP Builders)
  app.get("/api/services", (req, res) => {
    res.json(dbData.services);
  });

  // Secure endpoint to update the database
  app.post("/api/content/update", (req, res) => {
    const { password, services, projects, blogs, testimonials, faqs } = req.body;

    if (password !== "nkpadmin2026") {
      return res.status(401).json({ success: false, error: "Unauthorized: Incorrect admin security credentials." });
    }

    if (!services || !projects || !blogs || !testimonials || !faqs) {
      return res.status(400).json({ success: false, error: "Bad Request: Missing database structure fields." });
    }

    dbData = { services, projects, blogs, testimonials, faqs };

    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), "utf-8");
      res.json({ success: true, message: "Central database synchronized successfully." });
    } catch (err) {
      console.error("Failed to write updated database:", err);
      res.status(500).json({ success: false, error: "Internal Server Error: Unable to persist data to disk." });
    }
  });

  // Quotation Submission Endpoint
  app.post("/api/quote", (req, res) => {
    const { name, phone, email, location, serviceType, areaSqft, budgetType, message } = req.body;

    if (!name || !phone || !serviceType) {
      return res.status(400).json({ error: "Name, Phone, and Service Type are required fields." });
    }

    // Generate simulated estimation based on standard Tamil Nadu rate sheets
    let ratePerSqft = 1800;
    if (serviceType.includes("construction")) {
      ratePerSqft = budgetType === "luxury" ? 2250 : budgetType === "premium" ? 1950 : 1650;
    } else if (serviceType.includes("painting")) {
      ratePerSqft = serviceType.includes("exterior") ? 25 : 18;
    } else if (serviceType.includes("waterproofing")) {
      ratePerSqft = 65;
    } else {
      ratePerSqft = 80;
    }

    const calculatedCost = areaSqft ? Number(areaSqft) * ratePerSqft : null;

    res.json({
      success: true,
      referenceID: "NKP-" + Math.floor(100000 + Math.random() * 900000),
      message: `Thank you, ${name}. Your quote request for ${serviceType} has been submitted successfully! An engineer will contact you shortly to schedule a free site visit to Mahalakshmi Nagar / Chengalpattu / surrounding Tamil Nadu areas.`,
      estimate: calculatedCost ? {
        total: calculatedCost,
        ratePerSqft,
        remarks: "This is an approximate regional estimate. Final quotation will be provided after our Free Site Visit.",
      } : null,
    });
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: "Name, Phone, and Message are required." });
    }

    res.json({
      success: true,
      ticketID: "NKP-TCK-" + Math.floor(1000 + Math.random() * 9000),
      message: `Dear ${name}, your enquiry has been filed. Our team will call you back on ${phone} within 2 business hours.`,
    });
  });

  // EMI and Loan Calculator Helper
  app.post("/api/emi", (req, res) => {
    const { loanAmount, tenureYears, interestRate = 8.5 } = req.body;

    if (!loanAmount || !tenureYears) {
      return res.status(400).json({ error: "Loan amount and tenure years are required." });
    }

    const p = Number(loanAmount);
    const r = Number(interestRate) / 12 / 100;
    const n = Number(tenureYears) * 12;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    res.json({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      monthlyBreakdown: Array.from({ length: Math.min(12, n) }).map((_, i) => {
        const monthInterest = p * r; // rough estimate first month
        return {
          month: i + 1,
          emi: Math.round(emi),
          principalPaid: Math.round(emi - monthInterest),
          interestPaid: Math.round(monthInterest),
        };
      }),
    });
  });

  // Gemini AI Construction Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, chatHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message field is required." });
    }

    if (!ai) {
      // Return beautiful, highly accurate civil engineering offline response
      const lowercaseMsg = message.toLowerCase();
      let responseText = "Thank you for reaching out to NKP Builders! I am currently operating in offline mode, but I can still assist you. Our managing director Er. Prabhakaran B.E. (Civil) and our field engineers are ready to visit your site in Chengalpattu, Thiruporur, or Kelambakkam. How can I help you today?";

      if (lowercaseMsg.includes("price") || lowercaseMsg.includes("cost") || lowercaseMsg.includes("rate") || lowercaseMsg.includes("budget")) {
        responseText = `NKP Builders offers competitive, premium quality construction rates in Chengalpattu and South Chennai suburbs:
• Standard Package: ₹1,650 per sqft (Standard steel, quality brick, Asian Paints interior/exterior)
• Premium Package: ₹1,950 per sqft (TATA/JSW steel, UltraTech cement, Royale/Apex paint, Kajaria tiles)
• Luxury Package: ₹2,250+ per sqft (Architectural custom designing, premium automation fittings, imported marble/granite)

Would you like to generate a detailed cost estimate using our Quotation Calculator tool on this website? Or schedule a Free Site Visit?`;
      } else if (lowercaseMsg.includes("warranty") || lowercaseMsg.includes("asian paints") || lowercaseMsg.includes("waterproof")) {
        responseText = `NKP Builders is an authorized contracting expert in Chengalpattu. We offer:
• 5-Year Waterproofing Warranty using high-grade Dam Sheath Crystalline membrane coatings.
• Up to 5-Year Asian Paints warranty on premium weather shielding Apex Ultima Protek exterior layouts.
• Zero-leakage guarantees on roofing, toilets, and water tanks.

We supply official written warranty booklets signed by our engineer N. K. Prabhakaran upon project handover.`;
      } else if (lowercaseMsg.includes("phone") || lowercaseMsg.includes("contact") || lowercaseMsg.includes("whatsapp") || lowercaseMsg.includes("address")) {
        responseText = `You can directly reach NKP Builders via:
• Mobile: +91 96775 45615 / +91 93639 38677 (Available for calls and WhatsApp)
• Email: admin@nkpbuilders.com
• Office Address: No.389, Gangai Street, Mahalakshmi Nagar, Chengalpattu – Thiruporur Road, Tamil Nadu, India.

We offer Free Site Inspections! Would you like to share your phone number so Er. Prabhakaran can call you?`;
      } else if (lowercaseMsg.includes("service") || lowercaseMsg.includes("do you do")) {
        responseText = `NKP Builders specializes in:
• Turnkey Civil Construction (Villas, Houses, Commercial Buildings)
• Full Home Renovation & Floor Additions
• Interior & Exterior Painting (Asian Paints authorized)
• Expert Waterproofing & Polymer Wall Crack Injection
• Electrical, Plumbing, Tiles, and False Ceilings

Please let us know which service you are looking for, and we will formulate a customized quote for you!`;
      }

      return res.json({ text: responseText });
    }

    try {
      const SYSTEM_INSTRUCTION = `You are the official AI Assistant for NKP BUILDERS, a premium and highly trusted construction, renovation, painting, and waterproofing company based in Chengalpattu, Tamil Nadu, India.
Your tone should be highly professional, polite, and helpful, acting as an expert Project Consultant or Civil Engineer.

Key Company Information:
- Name: NKP BUILDERS
- Slogan: "Building Trust. Delivering Quality."
- Location: No.389, Gangai Street, Mahalakshmi Nagar, Chengalpattu – Thiruporur Road, Tamil Nadu, India.
- Contacts: Phone: +91 96775 45615, +91 93639 38677. Email: admin@nkpbuilders.com.
- Areas Served: Chengalpattu, Chennai, Kelambakkam, Thiruporur, Mahabalipuram, Guduvanchery, Tambaram, and surrounding suburbs of Tamil Nadu.
- Founder & Managing Director: Er. N. K. Prabhakaran, B.E. (Civil).
- Services Offered: Turnkey Construction, Renovation, Interior Painting, Exterior Painting, Waterproofing, Tile layout, False ceiling, Plumbing & Electrical.
- Warranty: 5 Years Asian Paints weatherproofing paint coatings & Dam Sheath waterproofing guarantee.

Guidelines for interaction:
1. Provide accurate structural construction details. Frame approximate building cost around ₹1,650 to ₹2,300 per sqft.
2. Emphasize "Vasthu-compliant designs", "written 5-year warranties", and "Free Site Visits".
3. Keep answers compact, professional, structured, and easy to read. Encourage booking a free site visit or calling us on +91 96775 45615.
4. Do not talk about other brands besides Asian Paints, UltraTech Cement, JSW/TATA Steel, Finolex wires, Kajaria Tiles. Use regional local terms (Tamil Nadu, Chengalpattu, Vasthu) beautifully.`;

      // Formulate chats with the official genai SDK format
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to connect to AI server. Running backup answer mode.", text: "Our AI model is currently busy. Please feel free to contact Er. N. K. Prabhakaran directly at +91 96775 45615 for immediate structural advice and free site planning." });
    }
  });

  // --- Vite Dev Server Middleware Integration ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(currentDir, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NKP BUILDERS Server is running on http://localhost:${PORT}`);
  });
}

startServer();
