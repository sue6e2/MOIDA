const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/", {
            target: "http://13.124.164.33:5001",
            changeOrigin: true,
        })
    );
};