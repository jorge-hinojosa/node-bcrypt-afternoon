import React, { Component } from "react";
import axios from "axios";

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureUrl: ""
    };
    this.addTreasure = this.addTreasure.bind(this);
  }

  handleInput(e) {
    this.setState({ treasureUrl: e.target.value });
  }

  addTreasure() {
    const { treasureUrl } = this.state;
    axios
      .post("/api/treasure/user", { treasureUrl: treasureUrl })
      .then(res => {
        this.props.addMyTreasure(res.data);
        this.setState({ treasureUrl: "" });
      })
      .catch(err => {
        console.log(err);
        alert(err.response.request.response);
      });
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
