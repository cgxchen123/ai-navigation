const https = require('https');
const fs = require('fs');
const path = require('path');

const token = 'cfoat_utY_F_51fQ-f_tdqcWka17jiLiR6owfcn00Xkn-oOuE.gMTnuG6VhZ26vo6vLdjYNoGRyD0p_UTVo0VsUSjo8NI';
const accountId = '7d6a5cae67299410987176d5963dd765';
const subdomain = 'ai-nav-site';

// Read worker code
const workerPath = path.join(__dirname, 'worker.js');
const workerCode = fs.readFileSync(workerPath, 'utf8');

// Replace the token in worker code with a placeholder
const workerBody = workerCode.replace(token, 'PLACEHOLDER_TOKEN');

const payload = JSON.stringify({
  body: workerBody,
  compatibility_date: '2024-01-01',
  migrations: [],
  metadata: {
    format: 'service-worker',
    module: true
  },
  name: subdomain
});

console.log('Deploying worker to Cloudflare...');
console.log(`Subdomain: ${subdomain}.workers.dev`);

const req = https.request({
  hostname: 'api.cloudflare.com',
  path: `/client/v4/accounts/${accountId}/workers/scripts/${subdomain}`,
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    if (res.statusCode === 200) {
      console.log('\n✅ 部署成功!');
      console.log(`🌐 网站地址: https://${subdomain}.workers.dev`);
      console.log('请在浏览器中打开查看效果!');
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(payload);
req.end();
