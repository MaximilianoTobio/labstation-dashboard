import { Button } from "react-bootstrap";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={theme === "dark" ? "light" : "dark"}
      size="sm"
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
      className="d-flex align-items-center"
    >
      {theme === "light" ? (
        <>
          <FaMoon className="me-2" /> Modo Oscuro
        </>
      ) : (
        <>
          <FaSun className="me-2" /> Modo Claro
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
