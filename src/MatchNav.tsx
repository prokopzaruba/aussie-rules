import { useContext, useState } from 'react';
import { AppContext } from './App';

interface Props {
  round: number;
  currentRound: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
}

const MatchNav = (props: Props) => {
  const { buttonSet, setURL, setButtonSet } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(-1);

  // go 1 round down
  const decreaseRound = () => {
    if (props.round > 1) {
      props.setRound(props.round - 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.round - 1
        }`
      );
    }
  };

  const handleMouseEnter = (matchNum: number) => {
    setIsHovered(matchNum);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };

  // go 1 round up
  const increaseRound = () => {
    if (props.round < 24) {
      props.setRound(props.round + 1);
      setURL(
        `https://api.squiggle.com.au/?q=games;year=2023;round=${
          props.round + 1
        }`
      );
    }
  };

  // go back to current round
  const backToCurrentRount = () => {
    props.setRound(props.currentRound);
    setURL(
      `https://api.squiggle.com.au/?q=games;year=2023;round=${props.currentRound}`
    );
    setButtonSet('rounds');
  };
  return (
    <div className="match-nav">
      {/* we show set of buttons based on buttonSet variable - 1 version for matches of round and second version for matches of team or a single match  */}
      {buttonSet === 'rounds' && (
        <div className="round-buttons">
          <button
            className={
              isHovered === 1
                ? ' round-button minus button-hovered'
                : 'round-button minus'
            }
            onClick={decreaseRound}
            onMouseLeave={() => handleMouseLeave()}
            onMouseEnter={() => handleMouseEnter(1)}
          >
            −
          </button>
          <p className="round-text">round {props.round}</p>
          <button
            onClick={increaseRound}
            className={
              isHovered === 2 ? ' round-button button-hovered' : 'round-button'
            }
            onMouseLeave={() => handleMouseLeave()}
            onMouseEnter={() => handleMouseEnter(2)}
          >
            +
          </button>
        </div>
      )}
      {(buttonSet === 'teamMatches' || buttonSet === 'matchInfo') && (
        <div>
          <button
            className={
              isHovered === 3 ? ' back-button button-hovered' : 'back-button'
            }
            onMouseLeave={() => handleMouseLeave()}
            onMouseEnter={() => handleMouseEnter(3)}
            onClick={backToCurrentRount}
          >
            Back to current round
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchNav;
