import { useSelector } from "react-redux";
import { RootState } from "../../App/store/store";

export const useAppSelector = useSelector.withTypes<RootState>();