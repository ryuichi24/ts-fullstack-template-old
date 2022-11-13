// 
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 * @see https://www.electron.build/configuration/configuration#Metadata-homepage
 */
const config = {
    appId: "YourAppID",
    productName: "YourAppName",
    copyright: "Copyright © 2022 ${author}",
    asar: true,
    directories: {
        output: "release/${version}",
    },
    extraMetadata: {
        main: "dist/main/index.js",
    },
    files: ["dist/**/*"],
    win: {
        target: [
            {
                target: "nsis",
                arch: ["x64"],
            },
        ],
        artifactName: "${productName}-Windows-${version}-Setup.${ext}",
    },
    nsis: {
        oneClick: false,
        perMachine: false,
        allowToChangeInstallationDirectory: true,
        deleteAppDataOnUninstall: false,
    },
    mac: {
        target: ["dmg"],
        artifactName: "${productName}-Mac-${version}-Installer.${ext}",
    },
    linux: {
        icon: "electron/resources/iconset",
        target: ["AppImage", "deb"],
        artifactName: "${productName}-Linux-${version}.${ext}",
    },
};

// eslint-disable-next-line no-undef
module.exports = config;
