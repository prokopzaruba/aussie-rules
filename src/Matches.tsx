import useFetch from './useFetch';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from './App';
import MatchesDateTime from './MatchesDateTime';
import MatchesHTeam from './MatchesHTeam';
import MatchesATeam from './MatchesATeam';

interface Props {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  now: Date;
}

interface Game {
  date: string;
  hteam: string;
  ateam: string;
  id: number;
  hscore: number;
  ascore: number;
  complete: number;
  venue: string;
}

const Matches = (props: Props) => {
  const { URL, setButtonSet, setMatchID } = useContext(AppContext);

  // hover effect for each match
  const [isHovered, setIsHovered] = useState(-1);

  const {
    data: matches,
    refetch,
    isLoading,
  } = useFetch(URL, 'matches', props.round);

  useEffect(() => {
    refetch();
  }, [refetch, URL]);

  // convert received date from API to correct format
  const stringDateToNumber = (stringDate: string) => {
    const date = new Date(stringDate);
    const dateInMilliseconds = date.getTime();
    return dateInMilliseconds;
  };

  // open match
  const handleClick = (matchID: string) => {
    setButtonSet('matchInfo');
    setMatchID(matchID);
  };

  const handleMouseEnter = (matchNum: number) => {
    setIsHovered(matchNum);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };

  return (
    <div>
      {matches && (
        <div className="games">
          {matches.games
            .slice()
            .sort(
              (a: Game, b: Game) =>
                stringDateToNumber(a.date) - stringDateToNumber(b.date)
            )
            .map((game: Game, i: number) => (
              <div
                key={i}
                className={isHovered === i ? 'game game-hovered' : 'game'}
                onMouseLeave={() => handleMouseLeave()}
                onMouseEnter={() => handleMouseEnter(i)}
                onClick={() => handleClick(`${game.id}`)}
              >
                <div className="teams-time">
                  <MatchesHTeam game={game} />
                  <MatchesDateTime key={game.id} game={game} now={props.now} />
                  <MatchesATeam game={game} />
                </div>

                {game.complete < 100 && game.complete > 0 && (
                  <p className="matches-live">live</p>
                )}
              </div>
            ))}
        </div>
      )}
      {isLoading && <p className="loading">loading...</p>}
    </div>
  );
};

export default Matches;
