module.exports = {
  chainWebpack: config => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("file-loader")
      .loader("file-loader")
      .options({ outputPath: "markdown" })
      .end();
  },
};
