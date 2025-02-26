import { createContext, useContext, useEffect, useState } from "react";

const ReadmeContext = createContext();

export const ReadmeProvider = ({ children }) => {
    const [elements, setElements] = useState(() => {
        // Load from sessionStorage if available
        const storedElements = sessionStorage.getItem("readmeElements");
        return storedElements ? JSON.parse(storedElements) : [];
    });

    useEffect(() => {
        // Save to sessionStorage on change
        sessionStorage.setItem("readmeElements", JSON.stringify(elements));
    }, [elements]);

    return (
        <ReadmeContext.Provider value={{ elements, setElements }}>
            {children}
        </ReadmeContext.Provider>
    );
};

export const useReadme = () => useContext(ReadmeContext);