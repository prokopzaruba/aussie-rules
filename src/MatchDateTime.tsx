import React from 'react';

interface Props {
  date: string;
}

const MatchDateTime: React.FC<Props> = ({ date }) => {
  const formattedDate = date.split(' ')[0];
  const formattedTime = date.split(' ')[1];

  return (
    <div>
      <p className="match-date">{formattedDate}</p>
      <p className="match-time">{formattedTime}</p>
    </div>
  );
};

export default MatchDateTime;
