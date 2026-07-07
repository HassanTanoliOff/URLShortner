const { nanoid } = require("nanoid");
const { URL } = require("../models/url");

async function handler_GenerateShortURL(req, res) {
  const shortId = nanoid(8);
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "url is required" });

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render( "home", {id:shortId})
///   return res.json({ id: shortId });
}

async function handler_GetRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  console.log(`inside the controller entry:${entry} , shortid:${shortId}`)
  res.redirect(entry.redirectUrl);
}

async function handler_GetAnalytics(req,res) {
      const shortId = req.params.shortId;
      const result   =await  URL.findOne({shortId})
     return res.json({totalClicks:result.visitHistory?.length ,analytics:result.visitHistory})
}
async function handler_emptyGetRequest(req,res) {
  
}
module.exports = {
  handler_GenerateShortURL ,
  handler_GetRedirectUrl,
  handler_GetAnalytics
};
