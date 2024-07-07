import React from "react";
import "./Main.css"

interface MainProps {
  results: [];
  isLoading: boolean;
}

interface ResultsItem {
  name: string;
  gender: string;
  height: string;
  skin_color: string;
  birth_year: string;
}

class Main extends React.Component<MainProps> {
  constructor(props: MainProps) {
    super(props);
  }

  render() {
    return (
      <main className="main">
        {this.props.isLoading ? (
          <div className="loader"></div>
        ) : (
          this.props.results.map((item: ResultsItem) => (
            <div className="item" key={item.name}>
              <p>Name: <b>{item.name}</b></p>
              <p>Gender: {item.gender}</p>
              <p>Height: {item.height}</p>
              <p>Skin color: {item.skin_color}</p>
              <p>Birth year: {item.birth_year}</p>
            </div>
          ))
        )}
      </main>
    );
  }
}

export default Main;
