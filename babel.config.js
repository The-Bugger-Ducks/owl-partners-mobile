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
            "@components": "./src/components",
            "@routes": "./src/routes",
            "@screens": "./src/screens",
            "@assets": "./src/shared/assets",
            "@constants": "./src/shared/constants",
            "@interfaces": "./src/shared/interfaces",
            "@api": "./src/shared/services/api",
            "@requests": "./src/shared/services",
            "@custom-types": "./src/shared/types",
            "@utils": "./src/shared/utils",
          },
        },
      ],
    ],
  };
};
