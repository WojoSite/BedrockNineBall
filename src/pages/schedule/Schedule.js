import React from 'react';
import schedule from './Schedule.scss';
import scheduleData from '../../data/scheduleData.js';

function MatchList(props) {
  const matchItem = props.matches.map((match) =>
    <li key={match.id}>#{match.teamA} vs. #{match.teamB} on table {match.table}</li>
  );
  return (
    <ul>{matchItem}</ul>
  );
}

function RegularSeason(props){
  const regular = props.reg;
  const matchDays = regular.map((match) =>
    <div key={match.week} className={schedule.box}>
      <p>Date: {match.date}</p>
      <p>Week: {match.week}</p>
      <div>Matches:
        <MatchList matches={match.matches} />
      </div>
    </div>
  );
  return (
    <div className={schedule.container}>{matchDays}</div>
  );
}

function Playoffs(props){
  const playoffs = props.play;
  const matchDays = playoffs.map((match) =>
    <div key={match.week} className={schedule.box}>
      <p>Date: {match.date}</p>
      <p>Week: {match.week}</p>
      <div>Matches:
        <MatchList matches={match.matches} />
      </div>
    </div>
  );
  return (
    <div className={schedule.container}>{matchDays}</div>
  );
}

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleData: scheduleData
    };
  }

  render() {
    return (
      <div>
        <h2>Schedule: Spring/Summer 2018</h2>
        <RegularSeason reg={this.state.scheduleData['regular']}/>

      <h3>Playoffs</h3>
        <Playoffs play={this.state.scheduleData['playoffs']}/>
    </div>
    );
  }
}

export default Schedule;
