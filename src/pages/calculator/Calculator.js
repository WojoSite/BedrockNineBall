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
    this.handleSubmit(event.target.value, this.props.form)

  }

  handleSubmit(eventVal, form) {
    this.props.onTeamChange(eventVal, form);
  }

  render() {
    return (
      <form>
        <label>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Select Team" disabled>Select Team</option>
            {this.props.teams.map((team) =>
               <option key={team} value={team}>Team {team}</option>
             )}
          </select>
        </label>
      </form>
    );
  }
}

function RaceGrid(props){
  if (!props.show) {
    return null;
  }

  const teamA = props.teama;
  const teamB = props.teamb;

  function TableRow(props){
    return <tr>
              {renderName(props.id, "b")}
              {renderTD(0)}
              {renderTD(1)}
              {renderTD(2)}
              {renderTD(3)}
              {renderTD(4)}
              {renderTD(5)}
              {renderTD(6)}
          </tr>;
  }

  function NameCell(props) {
    if (!props.name) {
      return <td></td>;
    }
    return <td>{props.name}</td>;
  }

  function NumberCell(props) {
    return <td>{props.id}</td>;
  }

  function renderName(i, team){
    if (team === "a") {
      if (!teamA.players[i]) {
        return;
      } else {
        return <NameCell name={teamA.players[i].firstName} />;
      }
    }
    if (team === "b") {
      if (!teamB.players[i]) {
        return;
      } else {
        return <NameCell name={teamB.players[i].firstName} />;
      }
    }
  }

  function renderTR(i){
    if (!teamB.players[i]) {
      return;
    }
    return <TableRow id={i}/>;
  }

  function renderTD(i){
    if (!teamA.players[i]) {
      return;
    }
    return <NumberCell id={i} />;
  }

    return (
      <table>
        <tbody>
          <tr>
            <td></td>
            {renderName(0, "a")}
            {renderName(1, "a")}
            {renderName(2, "a")}
            {renderName(3, "a")}
            {renderName(4, "a")}
            {renderName(5, "a")}
            {renderName(6, "a")}
          </tr>
          {renderTR(0)}
          {renderTR(1)}
          {renderTR(2)}
          {renderTR(3)}
          {renderTR(4)}
          {renderTR(5)}
          {renderTR(6)}
        </tbody>
      </table>
    );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      teams: [],
      teamA: {},
      teamB: {},
      teamAselected: false,
      teamBselected: false
    };
    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  componentDidMount() {
    const teamNumbers = this.state.data.map((team) =>
      team.number
    );
    this.setState({
      teams: teamNumbers,
    });

    console.log( );
  }

  handleTeamChange(team, form){

    if (form === 'a') {
      this.setState({
        teamA: team,
        teamAselected: true
      });

      let makeInt = parseInt(team, 10);
      for (let i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].number === makeInt) {
          this.setState({
            teamA: this.state.data[i]
          });
        }
      }
    }

    if (form === 'b') {

      this.setState({
        teamB: team,
        teamBselected: true
      });

      let makeInt = parseInt(team, 10);
      for (let i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].number === makeInt) {
          this.setState({
            teamB: this.state.data[i]
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Race Calculator</h2>
        <div>
          <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='a'/>
          <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='b'/>
        </div>

        <RaceGrid teama={this.state.teamA} teamb={this.state.teamB} show={this.state.teamAselected && this.state.teamBselected}/>

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
