export default function handler(req, res) {
  res.status(200).json({
    name: "Acarpo Tech Hub Serverless Backend",
    version: "2.5.0",
    environment: "Vercel Serverless Function (Node.js runtime)",
    developer: "Philemon Tech Engine / Drenchack Tech Company",
    features: [
      "JSON Prettifier & Minifier Engine",
      "Base64 Transformer",
      "Crypto Hash Engine (MD5, SHA-1, SHA-256)",
      "Regex Pattern Evaluator",
      "Security Header Auditor"
    ]
  });
}
