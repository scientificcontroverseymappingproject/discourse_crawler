module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/psdb/" : "/",
  devServer: {
    allowedHosts: [".csb.app"], // <  Copy and paste the domain from the URL Codebox provides for your runtime here
  },
};
