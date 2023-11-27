import useFetch from './useFetch';
import { useContext, useState } from 'react';
import { AppContext } from './App';
import MatchStats from './MatchStats';
import MatchScoreDate from './MatchScoreDate';
import MatchTeam from './MatchTeam';
import MatchDateTime from './MatchDateTime';
import MatchLogoTeam from './MatchLogoTeam';

const Match = () => {
  // hover effect for team icons
  const [isHovered, setIsHovered] = useState(-1);
  const { matchID } = useContext(AppContext);

  const { data: match, isLoading } = useFetch(
    `https://api.squiggle.com.au/?q=games;year=2023;game=${matchID}`,
    'match',
    +matchID
  );

  const { setURL, setButtonSet } = useContext(AppContext);

  const showMatches = (id: number) => {
    setURL(`https://api.squiggle.com.au/?q=games;year=2023;team=${id}`);
    setButtonSet('teamMatches');
  };

  const handleMouseEnter = (matchNum: number) => {
    setIsHovered(matchNum);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };

  return (
    <div>
      {match &&
        (match.games[0].complete !== 0 ? (
          <div className="match">
            <div className="match-main">
              <MatchTeam
                teamName={match.games[0].hteam}
                isHovered={isHovered === 1}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                onClick={() => showMatches(match.games[0].hteamid)}
              />
              <MatchScoreDate
                complete={match.games[0].complete}
                date={match.games[0].date}
                hscore={match.games[0].hscore}
                ascore={match.games[0].ascore}
              />
              <MatchTeam
                teamName={match.games[0].ateam}
                isHovered={isHovered === 2}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
                onClick={() => showMatches(match.games[0].ateamid)}
              />
            </div>
            <MatchStats
              hGoals={match.games[0].hgoals}
              aGoals={match.games[0].agoals}
              hBehinds={match.games[0].hbehinds}
              aBehinds={match.games[0].abehinds}
            />
          </div>
        ) : (
          <div className="match">
            <div className="match-main">
              {/* home team logo and name */}
              <MatchLogoTeam
                teamId={match.games[0].hteamid}
                teamName={match.games[0].hteam}
                isHovered={isHovered === 1}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                onClick={() => showMatches(match.games[0].hteamid)}
              />
              <MatchDateTime date={match.games[0].date} />

              {/* away team logo and name */}
              <MatchLogoTeam
                teamId={match.games[0].ateamid}
                teamName={match.games[0].ateam}
                isHovered={isHovered === 2}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
                onClick={() => showMatches(match.games[0].ateamid)}
              />
            </div>
          </div>
        ))}
      {isLoading && <p className="loading">loading...</p>}
    </div>
  );
};

export default Match;
