const {
  extractTikTok,
} = require('../services/parser_service');

exports.parseTikTok = async (
  req,
  res,
) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Missing URL',
      });
    }

    const data =
      await extractTikTok(url);

    return res.json({
      success: true,
      data,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.toString(),
    });
  }
};