
import { combineReducers, legacy_createStore } from 'redux';
import { appReducer } from '../appProvider/app-reducer';
import { tasksReducer } from '@/fetures/Todolists/model/tasks-reducer/tasks-reducer';
import { todolistsReducer } from '@/fetures/Todolists/model/todolists-reducer/todolists-reducer';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer);

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;