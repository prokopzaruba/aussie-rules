interface Props {
  hGoals: number;
  aGoals: number;
  hBehinds: number;
  aBehinds: number;
}

const MatchStats: React.FC<Props> = ({
  hGoals,
  aGoals,
  hBehinds,
  aBehinds,
}) => {
  return (
    <div className="stats">
      <h3 className="stats-heading">Stats</h3>
      <div className="stat">
        <p className="stat-number-l">{hGoals}</p>
        <p className="stat-description">goals</p>
        <p className="stat-number-r">{aGoals}</p>
      </div>
      <div className="stat">
        <p className="stat-number-l">{hBehinds}</p>
        <p className="stat-description">behinds</p>
        <p className="stat-number-r">{aBehinds}</p>
      </div>
    </div>
  );
};

export default MatchStats;
