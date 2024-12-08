import { RootState } from "@/app/providers/reduxProvider/store"
import { useSelector } from "react-redux"

export const useAppSelector = useSelector.withTypes<RootState>()
