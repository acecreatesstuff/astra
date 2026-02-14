
const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');
const morgan = require('morgan');
const zlib = require('zlib');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cookieParser());

const decompress = (buffer, encoding) => {
  if (!buffer) return buffer;
  try {
    if (encoding === 'gzip') return zlib.gunzipSync(buffer);
    if (encoding === 'br') return zlib.brotliDecompressSync(buffer);
    if (encoding === 'deflate') return zlib.inflateSync(buffer);
  } catch (e) {
    return buffer;
  }
  return buffer;
};

const getTarget = (req) => {
  return req.cookies['ASTRA_TARGET'] || 'https://aistudio.google.com/';
};

const proxyOptions = {
  target: 'https://aistudio.google.com/', 
  router: (req) => getTarget(req),
  changeOrigin: true,
  followRedirects: true,
  secure: true,
  ws: true,
  cookieDomainRewrite: "", 
  
  onProxyReq: (proxyReq, req, res) => {
    const currentTarget = getTarget(req);
    const targetUrl = new URL(currentTarget);
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    proxyReq.setHeader('Host', targetUrl.host);
    proxyReq.setHeader('Origin', targetUrl.origin);
    proxyReq.setHeader('Referer', 'https://aistudio.google.com/');
    proxyReq.setHeader('X-Forwarded-Proto', 'https');
  },

  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    const headersToKill = [
      'content-security-policy',
      'content-security-policy-report-only',
      'x-frame-options',
      'frame-options',
      'x-content-type-options',
      'report-to',
      'cross-origin-resource-policy',
      'cross-origin-opener-policy'
    ];
    
    headersToKill.forEach(header => {
      delete proxyRes.headers[header];
    });

    if (proxyRes.headers['content-type']?.includes('text/html')) {
      const encoding = proxyRes.headers['content-encoding'];
      let html = decompress(responseBuffer, encoding).toString('utf8');
      
      const proxyBaseUrl = `${req.protocol}://${req.get('host')}`;
      const targetUrl = new URL(getTarget(req));
      const targetBase = targetUrl.origin;

      html = html.replace(new RegExp(targetBase, 'g'), proxyBaseUrl);
      html = html.replace(/\/\/www\.google\.com/g, `//${req.get('host')}`);

      const astraOverlay = `
        <div id="astra-gateway-control" style="position:fixed; top:0; left:0; width:100%; z-index:999999999; pointer-events:none; font-family: 'Inter', system-ui, sans-serif;">
          <div style="background:rgba(2,6,23,0.98); border-bottom:1px solid rgba(255,255,255,0.08); padding:8px 20px; display:flex; justify-content:space-between; align-items:center; pointer-events:auto; backdrop-filter:blur(12px);">
            <div style="display:flex; align-items:center; gap:10px;">
              <svg viewBox="0 0 100 100" style="width:20px; height:20px; color:white;" fill="currentColor"><path d="M 22,76 L 51,26 H 73 V 48 H 91 V 76 H 71 V 64 H 53 L 45,76 H 22 Z" /></svg>
              <span style="color:white; font-weight:900; letter-spacing:0.15em; font-size:12px; font-style:italic;">ASTRA</span>
              <span style="color:rgba(255,255,255,0.4); font-size:9px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-left:4px;">Browser Gateway v3.1</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="font-size:10px; color:rgba(255,255,255,0.3); font-weight:700; text-transform:uppercase; letter-spacing:0.05em; display:none; @media(min-width:640px){display:block;}">${targetUrl.host}</div>
              <button onclick="window.location.href='/'" style="background:rgba(255,255,255,0.05); color:white; border:1px solid rgba(255,255,255,0.1); padding:4px 12px; border-radius:6px; font-size:10px; font-weight:800; cursor:pointer; text-transform:uppercase; transition:all 0.2s;">Exit</button>
            </div>
          </div>
        </div>
        <style>
          body { padding-top: 40px !important; }
          #astra-gateway-control button:hover { background: rgba(255,255,255,0.1); border-color: rgba(99,102,241,0.5); color: #818cf8; }
        </style>
      `;
      
      html = html.replace('</body>', astraOverlay + '</body>');

      return html;
    }
    return responseBuffer;
  }),

  onError: (err, req, res) => {
    console.error('[ASTRA-GATEWAY-ERROR]:', err);
    res.status(500).send(`
      <body style="background:#020617; color:#475569; font-family:sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0;">
        <h1 style="color:#f8fafc; font-weight:900; font-style:italic; letter-spacing:0.1em;">CONNECTION FAILED</h1>
        <p style="margin-top:10px;">The site refused the connection.</p>
        <button onclick="window.location.href='/'" style="margin-top:20px; background:white; color:black; border:none; padding:10px 20px; border-radius:8px; font-weight:bold; cursor:pointer;">Return to Home</button>
      </body>
    `);
  }
};

app.use((req, res, next) => {
  if (req.path === '/' && !req.query.launch) {
    if (req.cookies['ASTRA_TARGET']) {
      return createProxyMiddleware(proxyOptions)(req, res, next);
    }
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
  }
  
  if (req.query.launch) {
    const target = req.query.url || 'https://aistudio.google.com/';
    const cleanTarget = target.startsWith('http') ? target : `https://${target}`;
    res.cookie('ASTRA_TARGET', cleanTarget, { 
      path: '/', 
      httpOnly: false, 
      secure: true, 
      sameSite: 'none' 
    });
    return res.redirect('/');
  }

  if (req.cookies['ASTRA_TARGET']) {
    return createProxyMiddleware(proxyOptions)(req, res, next);
  }
  
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

const server = app.listen(PORT, () => {
  console.log(`[ASTRA] Browser Gateway online at port ${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
  createProxyMiddleware(proxyOptions).upgrade(req, socket, head);
});
