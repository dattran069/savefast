const fs = require('fs');

const path = require('path');

const ytDlp =
  require('yt-dlp-exec');

exports.extractTikTok =
  async (url) => {
    const folder = path.join(
      __dirname,
      '../../downloads',
    );

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const output =
      path.join(
        folder,
        '%(id)s.%(ext)s',
      );

    // parse metadata
    const result = await ytDlp(
      url,
      {
        dumpSingleJson: true,
      },
    );

    // download video
    await ytDlp(url, {
      output,
    });

    const files =
      fs.readdirSync(folder);

    const latest =
      files
        .map((file) => ({
          file,
          time:
            fs.statSync(
              path.join(
                folder,
                file,
              ),
            ).mtime.getTime(),
        }))
        .sort(
          (a, b) =>
            b.time - a.time,
        )[0];

    return {
      title: result.title,

      thumbnail:
        result.thumbnail,

      videoUrl:
        `http://192.168.1.33:3000/downloads/${latest.file}`,
    };
  };