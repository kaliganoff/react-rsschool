import React from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import search from "../../services/search";

interface MainPageState {
  results: [];
  isLoading: boolean;
}

class MainPage extends React.Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.HandleSearch = this.HandleSearch.bind(this);
    this.state = {
      results: [],
      isLoading: false,
    };
  }

  componentDidMount(): void {
    if (localStorage.kaliganoffQuery) {
      search(localStorage.kaliganoffQuery).then((result: []) =>
        this.setState({ results: result }),
      );
    }
  }

  HandleSearch(query: string) {
    this.setState({ isLoading: true });
    search(query).then((result) =>
      this.setState({ results: result, isLoading: false }),
    );
    localStorage.kaliganoffQuery = query;
  }

  render() {
    return (
      <>
        <Header
          onSearch={this.HandleSearch}
          searchValue={localStorage.kaliganoffQuery}
        ></Header>
        <Main
          results={this.state.results}
          isLoading={this.state.isLoading}
        ></Main>
      </>
    );
  }
}

export default MainPage;
