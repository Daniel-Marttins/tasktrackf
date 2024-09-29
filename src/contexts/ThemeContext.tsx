/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  palette: PaletteType;
  toggleTheme: () => void;
};

type PaletteType = {
  primary: string;
  secondary: string;
  background: string;
  fontColor: string;
  subFontColor: string;
  iconsColor: string;
};

const lightPalette: PaletteType = {
  primary: "#fcfdff",
  secondary: "#f1f5f9",
  background: "#e2e8f0",
  fontColor: "#64748b",
  subFontColor: "#a0aec0",
  iconsColor: "#1e3a8a",
};

const darkPalette: PaletteType = {
  primary: "#000524",
  secondary: "#152b3c",
  background: "#334155",
  fontColor: "#d1d5db",
  subFontColor: "#a0aec0",
  iconsColor: "#60a5fa",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });
  const [palette, setPalette] = useState<PaletteType>(() => {
    return theme === "light" ? lightPalette : darkPalette;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const newPalette = newTheme === "light" ? lightPalette : darkPalette;
    setTheme(newTheme);
    setPalette(newPalette);
  };

  return (
    <ThemeContext.Provider value={{ theme, palette, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};