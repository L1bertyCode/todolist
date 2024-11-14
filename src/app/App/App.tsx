import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
interface AppProps { };
export const App = ({ }: AppProps) => {
  return (
    <div className={s.app}>
      <Todolist />
    </div>
  );
};