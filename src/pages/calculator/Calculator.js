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
      <form className="select-team">
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
              {renderTD(0, props.id)}
              {renderTD(1, props.id)}
              {renderTD(2, props.id)}
              {renderTD(3, props.id)}
              {renderTD(4, props.id)}
              {renderTD(5, props.id)}
              {renderTD(6, props.id)}
          </tr>;
  }

  function NameCell(props) {
    if (!props.name) {
      return;
    }
    return <td className="table-cell">{props.name}</td>;
  }

  function NumberCell(props) {
    return <td className="animated rubberBand">{getRace(props.playera, props.playerb)}</td>;
  }

  function getRace(rank1, rank2) {
    if (!rank1 || !rank2) { return("-"); }

    let tier = 0;
    let high;
    let diff = rank1 - rank2;


    if (diff >= 0) {
      high = rank1;
    } else {
      high = rank2;
    }

    if (high < 400) {
      tier = 1;
    } else if (high > 550) {
      tier = 3;
    } else {
      tier = 2;
    }


    let race1 = "";
    let race2 = "";
    switch (tier) {
      case 1:
        switch (true) {
          case Math.abs(diff) < 35:
            race1 = "3";
            race2 = "3";
            break;
          case Math.abs(diff) < 125:
            race1 = "3";
            race2 = "2";
            break;
          default:
            race1 = "3";
            race2 = "1";
            break;
        }
        break;
      case 2:
        switch (true) {
          case Math.abs(diff) < 45:
            race1 = "4";
            race2 = "4";
            break;
          case Math.abs(diff) < 81:
            race1 = "4";
            race2 = "3";
            break;
            case Math.abs(diff) < 113:
            race1 = "5";
            race2 = "3";
            break;
          case Math.abs(diff) < 148:
            race1 = "4";
            race2 = "2";
            break;
          case Math.abs(diff) < 176:
            race1 = "5";
            race2 = "2";
            break;
          default:
            race1 = "6";
            race2 = "2";
            break;
        }
        break;
      case 3:
        switch (true) {
          case Math.abs(diff) < 35:
            race1 = "5";
            race2 = "5";
            break;
          case Math.abs(diff) < 63:
            race1 = "5";
            race2 = "4";
            break;
          case Math.abs(diff) < 81:
            race1 = "6";
            race2 = "4";
            break;
          case Math.abs(diff) < 110:
            race1 = "5";
            race2 = "3";
            break;
          case Math.abs(diff) < 132:
            race1 = "6";
            race2 = "3";
            break;
          case Math.abs(diff) < 176:
            race1 = "7";
            race2 = "3";
            break;
          case Math.abs(diff) < 200:
            race1 = "8";
            race2 = "3";
            break;
          case Math.abs(diff) < 220:
            race1 = "7";
            race2 = "2";
            break;
          default:
            race1 = "8";
            race2 = "2";
            break;
        }
        break;
      default:
        tier = "fart";
        break;
    }

    if (diff < 0) {
      return( race2 + "-" + race1 );
    } else {
      return( race1 + "-" + race2 );
    }
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

  function renderTD(a,b){
    if (!teamA.players[a]) {
      return;
    }
    let aRating = teamA.players[a].rating;
    let bRating = teamB.players[b].rating;

    return <NumberCell playera={aRating} playerb={bRating}/>;
  }

  return (
    <div className="table-div animated bounceInUp">
      <table className="calc-table">
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
      <p className="note">Team {teamA.number} players are top and first number. Team {teamB.number} players are left and second number.</p>
    </div>
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
      <div className="calculator-container">
        <h2 className="calc-header">Race Calculator</h2>
        <div className="select-container">
          <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='a'/>
          <span>vs.</span>
          <TeamSelect teams={this.state.teams} onTeamChange={this.handleTeamChange} form='b'/>
        </div>

        <RaceGrid teama={this.state.teamA} teamb={this.state.teamB} show={this.state.teamAselected && this.state.teamBselected}/>

      </div>
    );
  }
}

export default Calculator;
