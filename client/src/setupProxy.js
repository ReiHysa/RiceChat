const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      "/api",
      { target: "https://rice-chat.herokuapp.com" } // ! Update this line if your API is accessable on a port other than 8000, eg 4000
    )
  );
};
