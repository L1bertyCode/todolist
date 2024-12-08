import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../theme"

import s from "./App.module.css"
import { Header } from "@/common/components/Header"
import { Main } from "../Main"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectThemeMode } from "../providers/appProvider/appSelectors"

interface AppProps {}

export const App = ({}: AppProps) => {
  const themeMode = useAppSelector(selectThemeMode)
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <div className={s.app}>
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
