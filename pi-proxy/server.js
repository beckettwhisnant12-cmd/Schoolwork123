
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Full HTTP Proxy
app.use('/proxy', createProxyMiddleware({
  target: '',
  changeOrigin: true,
  router: (req) => req.query.url,
  pathRewrite: {'^/proxy': ''},
  logLevel: 'debug',
  secure: false
}));

app.listen(PORT, () => {
  console.log(`Full HTTP Proxy server running on http://localhost:${PORT}`);
});
