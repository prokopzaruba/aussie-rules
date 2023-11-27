interface Game {
  hteam: string;
}

interface Props {
  game: Game;
}

const MatchesHTeam: React.FC<Props> = ({ game }) => {
  return (
    <div className="team">
      <div className="team-one">
        <p className="hteamtext">
          {game.hteam === 'Greater Western Sydney' ? 'Giants' : `${game.hteam}`}
        </p>
        <img
          className="matches-logo"
          src={`./imgs/${game.hteam}.png`}
          alt={game.hteam}
        />
      </div>
    </div>
  );
};

export default MatchesHTeam;
