module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@global": "./src/global",
            "@mocks": "./src/mocks",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@interfaces": "./src/utils/interfaces",
            "@requests": "./src/utils/requests",
            "@api": "./src/services/api",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
