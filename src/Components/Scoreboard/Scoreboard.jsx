/* ------------------------------------------
   Scoreboard - Component
--------------------------------------------- */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

class Scoreboard extends Component {
  static displayName = 'Scoreboard';
  static propTypes = {
    timer: PropTypes.shape({
      started: PropTypes.bool.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
    score: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
      homeScoring: PropTypes.bool.isRequired,
      awayScoring: PropTypes.bool.isRequired,
    }).isRequired,
  };
  render() {
    const {
      timer: { started, seconds },
      score: {home, away, homeScoring, awayScoring}
    } = this.props;
    const m = Math.floor(seconds/60);
    const s = seconds - m * 60;
    const time = `${m >= 10 ? m : `0${m}`}:${s >= 10 ? s : `0${s}`}`;
    return (
      <Main>
        <Team>
          <TeamColor color={'white'} />
          <Name>VAS</Name>
        </Team>
        <ScoreBox>
          <ScoreContainer>
            <Score>
              {homeScoring
                ?
                (<Score>
                  <ScoreSpan in>{home + 1}</ScoreSpan>
                  <ScoreSpan out>{home}</ScoreSpan>
                </Score>)
                : (<ScoreSpan>{home}</ScoreSpan>)
              }
            </Score>
          </ScoreContainer>
          <ScoreContainer>
            <Score>
              {awayScoring
                ?
                (<Score>
                  <ScoreSpan in>{away + 1}</ScoreSpan>
                  <ScoreSpan out>{away}</ScoreSpan>
                </Score>)
                : (<ScoreSpan>{away}</ScoreSpan>)
              }
            </Score>
          </ScoreContainer>
        </ScoreBox>
        <Team away>
          <Name>MAN</Name>
          <TeamColor color={'red'} />
        </Team>
        <Timer started={started}>{time}</Timer>
      </Main>
    );
  }
}

const Main = styled.div`
  display: flex;
  font-family: 'Montserrat', sans-serif;
  left: 25px;
  position: absolute;
  top: 25px;
`;

const Team = styled.div`
  align-items: center;
  background-color: hsla(240, 2%, 82%, .4);
  border-radius: 0;
  display: flex;
  font-weight: 600;
  height: 28px;
  justify-content: center;
  overflow: hidden;
  width: 66px;
`;

const Name = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  height: auto;
  text-align: center;
  text-transform: uppercase;
  width: 62px;
`;

const ScoreBox = styled.div`
  display: flex;
`;

const ScoreContainer = styled.div`
  overflow: hidden;
  z-index: 1;
`;

const Score = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 28px;
  justify-content: center;
  width: 32px;
  z-index: 1;
`;

const ScoreSpan = styled.span`
  color: #484a4c;
  font-size: 16px;
  font-weight: 700;
  ${p => (p.in || p.out) && css`
    animation: ${p.in ? numberInAnimation : numberOutAnimation} 1s 0s 1;
  `}
`;

const TeamColor = styled.div`
  background-color: #fff;
  background-color: ${p => p.color};
  height: 100%;
  width: 4px;
`;

const Timer = styled.div`
  align-items: center;
  background-color: #0bd280;
  border-radius: 0 0 3px 3px;
  box-shadow: inset 0 0 3px 0 rgba(10, 10, 10, .09);
  color: #fff;
  display: flex;
  font-weight: 700;
  height: 25px;
  justify-content: center;
  left: 50%;
  overflow: hidden;
  position: absolute;
  text-align: center;
  top: 28px;
  transform: translate(-50%, ${p => p.started ? '0px' : '-25px'});
  transition: transform 1s cubic-bezier(.08, .91, .30, 1);
  width: 64px;
  z-index: 0;
`;

const numberInAnimation = keyframes`
  from {
    transform: translateY(-28px)
  }
  to {
    transform: translateY(10px)
  }
`;

const numberOutAnimation = keyframes`
  from {
    transform: translateY(0)
  }
  to {
    transform: translateY(30px)
  }
`;

export default Scoreboard;
