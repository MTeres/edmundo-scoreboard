import React, { Component } from 'react';
import edgol from './edmundo.jpg';
import edgif from './edgif.gif';
import styled, { css } from 'styled-components';
import Scoreboard from './Components/Scoreboard/Scoreboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      timer: {
        seconds: 0,
        started: false,
        paused: true,
      },
      score: {
        home: 0,
        away: 0,
        homeScoring: false,
        awayScoring: false,
      },
    };
  }

  tickTimer() {
    this.setState(prevState => ({
      ...prevState,
      timer: {
        ...prevState.timer,
        seconds: prevState.timer.seconds + 1,
      }
    }))
  }

  handleTimer = () => {
    const { timer: { paused } } = this.state;
    if (paused) {
      this.timerID = setInterval(() => this.tickTimer(), 1000)
    } else {
      clearInterval(this.timerID)
    }
    this.setState(prevState => ({
      ...prevState,
      timer: {
        ...prevState.timer,
        started: true,
        paused: !paused
      }
    }))
  };

  resetTimer = () => {
    clearInterval(this.timerID);
    this.setState(prevState => ({
      ...prevState,
      timer: {
        seconds: 0,
        started: false,
        paused: true,
      },
      score: {
        home: 0,
        away: 0,
        homeScoring: false,
        awayScoring: false,
      },
    }))
  };

  handleGoal = (e) => {
    const { team } = e.target.dataset;
    this.goalSolver(team)
  };

  goalSolver(team) {
    const { score } = this.state;
    if(score[`${team}Scoring`]) {
      this.setState(prevState => ({
        ...prevState,
        score: {
          ...prevState.score,
          [`${team}Scoring`]: false,
          [team]: prevState.score[team] + 1
        }
      }));
      clearInterval(this.goalID)
    } else {
      this.setState(prevState => ({
        ...prevState,
        score: {
          ...prevState.score,
          [`${team}Scoring`]: true,
        }
      }));
      this.goalID = setInterval(() => this.goalSolver(team), 1000)
    }
  }

  render() {
    const { timer, score } = this.state;
    const canScore = !timer.started || (score.awayScoring || score.homeScoring || timer.paused);
    return (
      <Main>
        <PlayerScreen>
          <Scoreboard timer={timer} score={score} />
        </PlayerScreen>
        <Controls>
          <Section>
            <Tittle>
              Timer
            </Tittle>
            <Content>
              <Button onClick={this.handleTimer} disabled={timer.started}>Start</Button>
              {timer.started &&
                <Button onClick={this.handleTimer} disabled={!timer.started}>
                  {`${timer.paused ? 'Resume' : 'Pause'}`}
                </Button>
              }
              {timer.started &&
                <Button onClick={this.resetTimer} disabled={!timer.started}>Reset</Button>
              }
            </Content>
          </Section>
          <Section>
            <Tittle>
              Score
            </Tittle>
            <Content>
              <Button onClick={this.handleGoal} disabled={canScore} data-team='home'>Home</Button>
              <Button onClick={this.handleGoal} disabled={canScore} data-team='away'>Away</Button>
            </Content>
          </Section>
          {score.home === 3 &&
            <Edgif src={edgif}/>
          }
        </Controls>
      </Main>
    );
  }
}

const Main = styled.div`
  align-items: center;
  background-color: #30303A;
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  padding: 0 20px;
`;

const PlayerScreen = styled.div`
  background-image: url(${edgol});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 800px;
  min-width: 850px;
  position: relative;
`;

const Controls = styled.div`
  background-color: #121214;
  width: 300px;
  height: 400px;
`;

const Section = styled.div`
  border-bottom: 1px solid #fff;
  display: flex;
  flex-direction: column;
`;

const Tittle = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-top: 10px;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 10px;
`;

const Button = styled.button`
  background: #343436;
  border-radius: 3px;
  border: 3px solid #343436;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  line-height: 1.2;
  margin: 0 10px 0 0;
  outline: 0;
  padding: 10px 16px;
  text-align: center;
  ${p => p.disabled && css`
    opacity: .6;
    cursor: initial;
  `}
`;

const Edgif = styled.img`
  width: 300px;
  height: auto;
  margin-top: 10px;
`;

export default App;
