import { useContext, useState } from "react";
import "./Header.css";
import { ThemeContext } from "../../context/ThemeContext";

interface HeaderProps {
  searchValue: string;
  onSearch: (query: string) => void;
}

function Header({ searchValue, onSearch }: HeaderProps) {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [hasError, setHasError] = useState<boolean>(false);
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);

  if (hasError) throw new Error("Error!");

  return (
    <header
      className={`header ${isLightTheme ? "header-light" : "header-dark"}`}
      data-testid="header"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(inputValue);
        }}
      >
        <input
          onInput={(e) => {
            const { target } = e;
            const value = (target as HTMLInputElement).value;
            setInputValue(value);
          }}
          type="search"
          placeholder="Search the Star Wars"
          value={inputValue}
        />
        <button className={isLightTheme ? "" : "button-dark"}>Search</button>
        <button
          className={isLightTheme ? "" : "button-dark"}
          onClick={() => setHasError(true)}
          type="button"
        >
          Throw error
        </button>
        <button
          className={isLightTheme ? "" : "button-dark"}
          onClick={() => toggleTheme()}
        >
          {isLightTheme ? "Switch to Dark mode" : "Switch to Light mode"}
        </button>
      </form>
    </header>
  );
}

export default Header;
