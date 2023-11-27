import React from 'react';

interface Props {
  teamId: number;
  teamName: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const MatchLogoTeam: React.FC<Props> = ({
  teamId,
  teamName,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div>
      <img
        className={isHovered ? 'match-logo match-logo-hovered' : 'match-logo'}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        src={`./imgs/${teamName}.png`}
        alt={teamName}
      />
      <p className="match-team match-team-future">{teamName}</p>
    </div>
  );
};

export default MatchLogoTeam;
