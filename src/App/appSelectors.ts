import { ThemeMode } from "./App";
import { RootState } from "./store/store";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode;