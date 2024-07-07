import React from "react";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      inputValue: this.props.searchValue,
    };
  }

  onSearch() {
    this.props.onSearch(this.state.inputValue);
  }

  render() {
    return (
      <header className="header">
        <input
          onInput={(e) => this.setState({ inputValue: e.target.value })}
          type="search"
          placeholder="Search"
          value={this.state.inputValue}
        />
        <button onClick={() => this.onSearch()}>Search</button>
      </header>
    );
  }
}

export default Header;
