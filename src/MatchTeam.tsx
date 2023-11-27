// MatchTeam.tsx
import React from 'react';

interface Props {
  teamName: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const MatchTeam: React.FC<Props> = ({
  teamName,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div className="match-logo-team">
      <img
        className={isHovered ? 'match-logo match-logo-hovered' : 'match-logo'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        src={`./imgs/${teamName}.png`}
        alt={teamName}
      />
      <p className="match-team">{teamName}</p>
    </div>
  );
};

export default MatchTeam;
