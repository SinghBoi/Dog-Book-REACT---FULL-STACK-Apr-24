import { createContext } from "react";
import { getAll, getOne, create, change, remove } from "./DogService";

const DogsContext = createContext();

function DogsProvider({ children }) {

    return (
        <DogsContext.Provider value={{ getAll, getOne, create, change, remove }}>
            {children}
        </DogsContext.Provider>
    );
}

export { DogsContext, DogsProvider };