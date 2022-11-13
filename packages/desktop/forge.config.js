module.exports = {
  packagerConfig: {
    electronPackagerConfig: {
      // https://stackoverflow.com/questions/46857534/electron-forge-how-to-specify-a-source-directory-for-packaging
      dir: "./dist",
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
