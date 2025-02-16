import { createContext, ReactNode, Dispatch, SetStateAction } from "react";

export default createContext<Dispatch<SetStateAction<ReactNode>>>(() => {});
