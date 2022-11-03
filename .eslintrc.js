module.exports = {
  extends: [`@eyecuelab/react`],
  plugins: [`unused-imports`],
  rules: {
    "max-len": `off`,
    "unused-imports/no-unused-imports-ts": `warn`,
    "unused-imports/no-unused-vars-ts": `warn`,
    "no-console": `warn`,
  },
}
