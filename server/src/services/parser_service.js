const fs = require('fs');

const path = require('path');

const { execSync } =
  require('child_process');

exports.extractTikTok =
  async (url) => {

    const folder = path.join(
      __dirname,
      '../../downloads',
    );

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const id =
      Date.now().toString();

    const output =
      path.join(
        folder,
        `${id}.mp4`,
      );

    // metadata
    const metadataRaw =
      execSync(
        `yt-dlp --dump-single-json "${url}"`,
      ).toString();

    const metadata =
      JSON.parse(metadataRaw);

    // download
    execSync(
      `yt-dlp -o "${output}" "${url}"`,
    );

    return {
      title:
          metadata.title,

      thumbnail:
          metadata.thumbnail,

      videoUrl:
          `${process.env.BASE_URL}/downloads/${id}.mp4`,
    };
  };