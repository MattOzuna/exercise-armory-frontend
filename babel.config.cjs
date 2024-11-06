module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        env: true,
        glob: false,
      },
    ],
  ],
  plugins: ["babel-plugin-transform-import-meta"],
};
