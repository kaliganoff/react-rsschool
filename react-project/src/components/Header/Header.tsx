import React from "react";
import "./Header.css";

interface HeaderProps {
  searchValue: string;
  onSearch: (query: string) => void;
}

interface HeaderState {
  inputValue: string;
  hasError: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      inputValue: this.props.searchValue,
      hasError: false,
    };
  }

  onSearch() {
    this.props.onSearch(this.state.inputValue);
  }

  render() {
    if (this.state.hasError) throw new Error("Error!");

    return (
      <header className="header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.onSearch();
          }}
        >
          <input
            onInput={(e) => {
              const { target } = e;
              this.setState({ inputValue: (target as HTMLInputElement).value });
            }}
            type="search"
            placeholder="Search the Star Wars"
            value={this.state.inputValue}
          />
          <button>Search</button>
          <button
            onClick={() => this.setState({ hasError: true })}
            type="button"
          >
            Throw error
          </button>
        </form>
      </header>
    );
  }
}

export default Header;
