import React, { useState } from "react";
import "./Header.css";

interface HeaderProps {
  searchValue: string;
  onSearch: (query: string) => void;
}

function Header({ searchValue, onSearch }: HeaderProps) {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) throw new Error("Error!");

  return (
    <header className="header" data-testid="header">
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
        <button>Search</button>
        <button onClick={() => setHasError(true)} type="button">
          Throw error
        </button>
      </form>
    </header>
  );
}

export default Header;
