import { useState, useEffect } from "react";

const useThemeToggler = () => {
  const [theme, setTheme] = useState(window.__theme);

  useEffect(() => {
    setTheme(window.__theme);

    window.__onThemeChange = () => {
      setTheme(window.__theme);
    };
  }, [theme]);

  const toggleTheme = theme => {
    window.__setPreferredTheme(theme);
    setTheme(theme);
  };

  return [theme, toggleTheme];
};

export default useThemeToggler;
