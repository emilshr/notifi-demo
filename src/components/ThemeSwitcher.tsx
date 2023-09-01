import { Switch } from "@nextui-org/react";
import { SunIcon } from "@/svg-icons/sun-icon";
import { MoonIcon } from "@/svg-icons/moon-icon";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setDarkMode] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (mounted.current) {
      setDarkMode(theme === "dark");
    }
  }, [theme]);

  return (
    <Switch
      size="md"
      color="primary"
      isSelected={isDarkMode}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onValueChange={(_selected) => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    ></Switch>
  );
};
