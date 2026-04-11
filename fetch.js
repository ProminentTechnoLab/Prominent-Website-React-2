const https = require('https');
const fs = require('fs');

https.get('https://cuberto.com/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('cuberto_html.html', data);
        console.log('done');
    });
});
