// MatchScoreDate.tsx
import React from 'react';

interface MatchScoreDateProps {
  complete: number;
  date: string;
  hscore: number;
  ascore: number;
}

const MatchScoreDate: React.FC<MatchScoreDateProps> = ({
  complete,
  date,
  hscore,
  ascore,
}) => {
  return (
    <div className="match-middle">
      {complete === 100 ? (
        <p className="match-date">{date.split(' ')[0]}</p>
      ) : (
        <p className="live">live</p>
      )}
      <p className="match-score">
        {hscore} - {ascore}
      </p>
    </div>
  );
};

export default MatchScoreDate;
