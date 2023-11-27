interface Game {
  ateam: string;
}

interface Props {
  game: Game;
}

const MatchesATeam: React.FC<Props> = ({ game }) => {
  return (
    <div className="team team-two">
      <img
        className="matches-logo"
        src={`./imgs/${game.ateam}.png`}
        alt={game.ateam}
      />
      <p className="ateamtext">
        {game.ateam === 'Greater Western Sydney' ? 'Giants' : `${game.ateam}`}
      </p>
    </div>
  );
};

export default MatchesATeam;
