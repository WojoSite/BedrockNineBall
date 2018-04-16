import React from 'react';
import data from '../../data/leagueData.js';


function Team(props) {
  const players = props.players;
  const playerList = players.map((player) =>
    <li key={player.id}>{player.firstName + ' ' + player.lastName} - {player.rating}</li>
  );

  return (
    <a className="team-container">
      <h3 className="team">Team: {props.team}</h3>
      <h5 className="captain">Captain: {props.captain}</h5>
      <ul className="players-list">{playerList}</ul>
    </a>
  );
}

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }

  renderTeams(i) {
    return (
      <Team team={this.state.data[i].number} captain={this.state.data[i].captain} players={this.state.data[i].players}/>
    );
  }

  render() {
    return (
      <div className="teams-container">
        <h2>Teams</h2>
        {this.renderTeams(0)}
        {this.renderTeams(1)}
        {this.renderTeams(2)}
        {this.renderTeams(3)}
        {this.renderTeams(4)}
        {this.renderTeams(5)}
        {this.renderTeams(6)}
        {this.renderTeams(7)}
      </div>
    );
  }
}


export default Teams;
