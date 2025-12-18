import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();


const ThemeProvider = ({children}) => {
    const savedTheme = localStorage.getItem('theme') || "light";
    const [theme, setTheme] = useState(savedTheme);
    return (
        <ThemeContext.Provider
        value={{
            theme,
            setTheme
        }}
        >
        {children}
        </ThemeContext.Provider>
    );
}
export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}