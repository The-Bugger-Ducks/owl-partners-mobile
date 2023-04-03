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
            "@interfaces": "./src/shared/interfaces",
            "@requests": "./src/shared/utils/handlers",
            "@api": "./src/shared/services/api",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
