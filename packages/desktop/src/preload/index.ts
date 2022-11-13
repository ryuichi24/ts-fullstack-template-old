import * as os from "os";
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("os", {
    homedir: () => os.homedir(),
});
