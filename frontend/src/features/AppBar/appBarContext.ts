import { createContext, ReactNode, Dispatch, SetStateAction } from "react";

/**
 * Context that holds a setter function for dynamically injecting content into the AppBar.
 * Consumers can call the setter with a ReactNode to render custom content inside the AppBar.
 *
 * @example
 * // In a child component:
 * const setAppBarContents = useContext(AppBarContext);
 * useEffect(() => { setAppBarContents(<MyFilter />); }, []);
 */
const AppBarContext = createContext<Dispatch<SetStateAction<ReactNode>>>(
  () => {},
);

export default AppBarContext;
