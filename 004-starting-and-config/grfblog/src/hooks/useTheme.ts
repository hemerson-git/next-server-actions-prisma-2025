import { useThemeStore } from "@/stores/themeStore";

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    if (!savedTheme) {
      return document.body.classList.add("light");
    }

    document.body.classList.add(savedTheme);
  };

  return {
    toggleTheme,
    getSavedTheme,
    theme,
  };
};
