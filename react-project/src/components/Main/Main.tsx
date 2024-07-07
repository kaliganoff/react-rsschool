import React from "react";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        {this.props.results.map((item) => (
          <div>
            <p>{item.name}</p>
            <p>{item.gender}</p>
          </div>
        ))}
      </main>
    );
  }
}

export default Main;
