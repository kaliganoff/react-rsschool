import React from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import search from "../../services/search";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.HandleSearch = this.HandleSearch.bind(this);
    this.state = {
      results: [],
    };
  }

  componentDidMount(): void {
    if (localStorage.kaliganoffQuery) {
      search(localStorage.kaliganoffQuery).then((result) =>
        this.setState({ results: result }),
      );
    }
  }

  HandleSearch(query) {
    search(query).then((result) => this.setState({ results: result }));
    localStorage.kaliganoffQuery = query;
  }

  render() {
    return (
      <>
        <Header
          onSearch={this.HandleSearch}
          searchValue={localStorage.kaliganoffQuery}
        ></Header>
        <Main results={this.state.results}></Main>
      </>
    );
  }
}

export default MainPage;
