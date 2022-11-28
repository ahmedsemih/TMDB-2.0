import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

const baseContext = createContext<any>(null);

export const BaseProvider = ({ children }: any) => {
    const [selected, setSelected]:[any,Dispatch<SetStateAction<any>>] = useState(null);
    const [activeType, setActiveType]:[string,Dispatch<SetStateAction<string>>] = useState("movie");

    const values = {
        selected,
        setSelected,
        activeType,
        setActiveType
    };

    return <baseContext.Provider value={values}>{children}</baseContext.Provider>
};

export const useBaseContext = () => useContext(baseContext);