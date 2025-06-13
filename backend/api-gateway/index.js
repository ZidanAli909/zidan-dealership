const express = require("express");
const app = express();
const port = 3000;

// Getaway
app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:4001',
  changeOrigin: true,
  pathRewrite: { '^/auth': '' },
}));

// Server Port
app.listen(port, () => {
  console.log(`Server gateway berjalan pada: http://localhost:${port}`);
});