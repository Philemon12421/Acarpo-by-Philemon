export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    service: "Acarpo Serverless API Engine",
    platform: "Vercel Serverless Functions",
    region: req.headers['x-vercel-id'] || 'global',
    timestamp: new Date().toISOString()
  });
}
