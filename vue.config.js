module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/discourse_crawler/" : "/",
  devServer: {
    allowedHosts: [".csb.app"], // <  Copy and paste the domain from the URL Codebox provides for your runtime here
  },
};
