import { createContext, ReactNode, useMemo, useState } from "react";

export const ThemeContext = createContext({
  isLightTheme: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => setIsLightTheme((prevTheme) => !prevTheme);

  const contextValue = useMemo(
    () => ({ isLightTheme, toggleTheme }),
    [isLightTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
