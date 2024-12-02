import { RootState } from "../providers/reduxProvider/store";
import { useSelector } from "react-redux";



import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from "../theme";

import s from "./App.module.css";
import { Header } from "@/common/components/Header";
import { Main } from "./Main";


type ThemeMode = 'dark' | 'light';

interface AppProps { };

export const App = ({ }: AppProps) => {
  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <div className={s.app}>
        <Header />
        <Main />
      </div >
    </ThemeProvider>
  );
};