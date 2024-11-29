import { RootState } from "../providers/reduxProvider/store";
import { useSelector } from "react-redux";

import { Header } from "@/widgets/Header";
import { Main } from "@/widgets/Main";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from "../theme";

import s from "./App.module.css";

import { FilterValuesType } from "@/model/tasks-reducer/tasks-reducer";

type ThemeMode = 'dark' | 'light';

export type TodolistType = {
  id: string,
  title: string;
  filter: FilterValuesType;
};
interface AppProps { };

export const App = ({ }: AppProps) => {
  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode);
  const theme = getTheme(themeMode);
  return (
    <ThemeProvider theme={theme

    }>
      <CssBaseline />
      <div className={s.app}>
        <Header />
        <Main />
      </div >
    </ThemeProvider>
  );
};