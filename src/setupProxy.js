// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/fetchCsv', createProxyMiddleware({
    target: 'https://firebasestorage.googleapis.com',
    changeOrigin: true,
    pathRewrite: {
      '^/fetchCsv': '',  // Remove /fetchCsv prefix when forwarding the request
    },
  }));
};
