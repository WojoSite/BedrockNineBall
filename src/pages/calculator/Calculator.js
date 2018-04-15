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

  function NameCell(props) {
    if (!props.name) {
      return <td></td>;
    }
    return <td>{props.name}</td>;
  }

  function renderName(i, team){

    if (team === "a") {
      if (!teamA.players[i]) {
        return <td></td>;
      } else {
        return <NameCell name={teamA.players[i].firstName} />;
      }
    }

    if (team === "b") {
      if (!teamB.players[i]) {
        return <td></td>;
      } else {
        return <NameCell name={teamB.players[i].firstName} />;
      }
    }
  }

  // function NumberCell(props) {
  //   return <td>Welcome back!</td>;
  // }

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
          <tr>
            {renderName(0, "b")}
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            {renderName(1, "b")}
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            {renderName(2, "b")}
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
          </tr>
          <tr>
            {renderName(3, "b")}
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
          </tr>
          <tr>
            {renderName(4, "b")}
            <td>29</td>
            <td>30</td>
            <td>31</td>
            <td>32</td>
            <td>33</td>
            <td>34</td>
            <td>35</td>
          </tr>
          <tr>
            {renderName(5, "b")}
            <td>36</td>
            <td>37</td>
            <td>38</td>
            <td>39</td>
            <td>40</td>
            <td>41</td>
            <td>42</td>
          </tr>
          <tr>
            {renderName(6, "b")}
            <td>43</td>
            <td>44</td>
            <td>45</td>
            <td>46</td>
            <td>47</td>
            <td>48</td>
            <td>49</td>
          </tr>
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
