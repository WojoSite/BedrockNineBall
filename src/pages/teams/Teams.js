import React from 'react';
import data from '../../data/leagueData.js';
import teamstyles from './Teams.scss';


function Team(props) {
  const players = props.players;
  const playerList = players.map((player) =>
    <li key={player.id}>{player.firstName + ' ' + player.lastName} - {player.rating}</li>
  );

  return (
    <a className={teamstyles.teamcontainer}>
      <h3 className={teamstyles.team}>Team: {props.team}</h3>
      <h5 className={teamstyles.captain}>Captain: {props.captain}</h5>
      <ul className={teamstyles.playerslist}>{playerList}</ul>
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
      <div>
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
