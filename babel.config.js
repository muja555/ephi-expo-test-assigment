module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        root: ["./"],
        alias: {
          "modules": "./src/modules/",
          "core": "./src/modules/core/",
          "assets": "./assets/",
        },
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ]
  };
};
