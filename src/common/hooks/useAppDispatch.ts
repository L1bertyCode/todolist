import { AppDispatch } from "@/app/providers/reduxProvider/store"
import { useDispatch } from "react-redux"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
