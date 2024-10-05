import { useDispatch } from "react-redux";
import { AppDispatch } from "../../App/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();