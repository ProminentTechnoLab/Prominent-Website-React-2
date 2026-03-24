const https = require('https');
const fs = require('fs');

const url = 'https://mixkit.co/free-stock-video/abstract/';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Regex to find multiple mp4 links and get a cool abstract loop
    const matches = data.match(/https:\/\/assets\.mixkit\.co\/videos\/preview\/mixkit-[^\"]+-large\.mp4/g);
    if (matches && matches.length > 0) {
      // Find a "particles" or "waves" or "loop" video if possible, else use first
      const videoUrl = matches.find(m => m.includes('particle') || m.includes('abstract') || m.includes('wave')) || matches[0];
      console.log('Found video URL:', videoUrl);
      const file = fs.createWriteStream('./public/videos/hero-background.mp4');
      https.get(videoUrl, (videoRes) => {
        videoRes.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Video downloaded successfully');
        });
      });
    } else {
      console.log('No video URL found');
    }
  });
}).on('error', err => console.error(err));
