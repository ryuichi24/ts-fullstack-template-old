import * as path from "path";
import { BrowserWindow, app } from "electron";

const isDev = !app.isPackaged;
const isMac = process.platform === "darwin";
const RENDERER_PORT = process.env.RENDERER_PORT;

let mainWindow: BrowserWindow | null;

// Main Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: isDev ? 1000 : 500,
        height: 600,
        //   icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.resolve(__dirname, "preload.js"),
        },
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL(`http://localhost:${RENDERER_PORT}`);
    } else {
        mainWindow.loadFile(
            path.resolve(path.dirname(__dirname), "src", "renderer/dist/index.html")
        );
    }
}

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

    app.on("window-all-closed", () => {
        if (!isMac) {
            app.quit();
        }
    });

    mainWindow?.on("closed", () => (mainWindow = null));
});
