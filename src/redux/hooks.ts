import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

const createSliceSelector = <T>(selector: (state: RootState) => T) => {
  return () => useSelector(selector);
};

export const useAuthSelector = createSliceSelector((state) => state.auth);
