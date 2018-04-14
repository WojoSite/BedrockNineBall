import React from 'react';
import data from '../../data/leagueData.js';


class TeamSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Select Team',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onTeamChange(this.state.value, this.props.form);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Select Team" disabled>Select Team</option>
            {this.props.teams.map((team) =>
               <option key={team} value={team}>Team {team}</option>
             )}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      teams: [],
      players: [],
      teamAselected: null,
      teamBselected: null
    };
    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  componentDidMount() {
    const teamNumbers = this.state.data.map((team) =>
      team.number
    );
    // const playerList = this.state.data.map((player) =>
    //   player.firstName
    // );
    this.setState({
      teams: teamNumbers
      // players: playerList
    });
  }

  handleTeamChange(team, form){
    if (form === 'a') {
      this.setState({
        teamAselected: team
      });
    }
    if (form === 'b') {
      this.setState({
        teamBselected: team
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Race Calculator</h2>
        <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='a'/>
        <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='b'/>
      </div>
    );
  }
}

// function getRace(rank1, rank2) {
//   if (!rank1 || !rank2) { return("-"); }
//
//   var diff = rank1 - rank2;
//   var tier = 0;
//   var high;
//
//   if (diff >= 0) {
//     high = rank1;
//   } else {
//     high = rank2;
//   }
//
//   if (high < 400) {
//     tier = 1;
//   } else if (high > 550) {
//     tier = 3;
//   } else {
//     tier = 2;
//   }
//
//
//   var race1 = "";
//   var race2 = "";
//   switch (tier) {
//     case 1:
//       switch (true) {
//         case Math.abs(diff) < 35:
//           race1 = "3";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 125:
//           race1 = "3";
//           race2 = "2";
//           break;
//         default:
//           race1 = "3";
//           race2 = "1";
//           break;
//       }
//       break;
//     case 2:
//       switch (true) {
//         case Math.abs(diff) < 45:
//           race1 = "4";
//           race2 = "4";
//           break;
//         case Math.abs(diff) < 81:
//           race1 = "4";
//           race2 = "3";
//           break;
//           case Math.abs(diff) < 113:
//           race1 = "5";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 148:
//           race1 = "4";
//           race2 = "2";
//           break;
//         case Math.abs(diff) < 176:
//           race1 = "5";
//           race2 = "2";
//           break;
//         default:
//           race1 = "6";
//           race2 = "2";
//           break;
//       }
//       break;
//     case 3:
//       switch (true) {
//         case Math.abs(diff) < 35:
//           race1 = "5";
//           race2 = "5";
//           break;
//         case Math.abs(diff) < 63:
//           race1 = "5";
//           race2 = "4";
//           break;
//         case Math.abs(diff) < 81:
//           race1 = "6";
//           race2 = "4";
//           break;
//         case Math.abs(diff) < 110:
//           race1 = "5";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 132:
//           race1 = "6";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 176:
//           race1 = "7";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 200:
//           race1 = "8";
//           race2 = "3";
//           break;
//         case Math.abs(diff) < 220:
//           race1 = "7";
//           race2 = "2";
//           break;
//         default:
//           race1 = "8";
//           race2 = "2";
//           break;
//       }
//       break;
//     default:
//       tier = "fart";
//       break;
//   }
//
//   if (diff < 0) {
//     return( race2 + " | " + race1 );
//   } else {
//     return( race1 + " | " + race2 );
//   }
// }

export default Calculator;
