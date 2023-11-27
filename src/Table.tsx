import { useContext } from 'react';
import useFetch from './useFetch';
import { AppContext } from './App';

interface Team {
  name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pts: number;
  id: number;
}

interface Props {
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
}

const Table = (props: Props) => {
  const { setURL, setButtonSet } = useContext(AppContext);

  const { data: teams, isLoading } = useFetch(
    'https://api.squiggle.com.au/?q=standings;year=2023',
    'table',
    0
  );

  // show matches of a team that we click on
  const showMatches = (id: number) => {
    setURL(`https://api.squiggle.com.au/?q=games;year=2023;team=${id}`);
    props.setRound(-id);
    setButtonSet('teamMatches');
  };

  return (
    <div className="standings">
      {teams && (
        <table className="standings-table">
          <thead>
            <tr>
              <th className="th-l">Pos</th>
              <th className="team-heading">Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th className="th-r">Pts</th>
            </tr>
          </thead>
          <tbody>
            {teams?.standings.map((team: Team, i: number) => (
              <tr key={i}>
                <td className="td-last-l">{i + 1}</td>
                <td>
                  <button
                    className="team-button"
                    onClick={() => showMatches(team.id)}
                  >
                    <img
                      className="table-logo"
                      src={`./imgs/${team.name}.png`}
                      alt={team.name}
                    />
                    {team.name}
                  </button>
                </td>
                <td>{team.played}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td className="td-last-r">{team.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading && <p className="loading">loading...</p>}
    </div>
  );
};

export default Table;
