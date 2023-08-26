import { nativeTheme, ipcMain } from "electron";
import { System } from "./types";

nativeTheme.themeSource = "dark";

const toggleDarkMode = () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
};

const handleSystemCommands = () => {
  ipcMain.handle(System.DarkModeToggle, toggleDarkMode);
};

export default handleSystemCommands;
