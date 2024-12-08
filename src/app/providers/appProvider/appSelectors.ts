import { RootState } from "../reduxProvider/store"

export const selectThemeMode = (state: RootState) => state.app.themeMode
