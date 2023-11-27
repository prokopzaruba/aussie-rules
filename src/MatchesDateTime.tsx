interface Game {
  id: number;
  complete: number;
  hscore: number;
  ascore: number;
  date: string;
}

interface Props {
  game: Game;
  now: Date;
}

const MatchesDateTime: React.FC<Props> = ({ game, now }) => {
  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate: string = formatter.format(date);
    return formattedDate;
  };

  // in LOCAL TIME
  // const convertToLocalTime = (AUTime: string) => {
  //   const matchDate = new Date(AUTime);
  //   const timeZoneDiff = 14 - props.now.getTimezoneOffset() / 60;

  //   // calculate the local time in milliseconds by subtracting the offset from the API time
  //   const localTime = matchDate.getTime() + 60 * timeZoneDiff * 60 * 1000;

  //   // create a new Date object for the local time
  //   const localDate = new Date(localTime).toLocaleTimeString([], {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });

  //   return localDate;
  // };

  const convertToLocalTime = (AUTime: string) => {
    const matchDate = new Date(AUTime);
    const timeZoneDiff = 14 - now.getTimezoneOffset() / 60;

    // calculate the local time in milliseconds by subtracting the offset from the API time
    const localTime = matchDate.getTime() + 60 * timeZoneDiff * 60 * 1000;

    // create a new Date object for the local time
    const localDate = new Date(localTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Set hour12 option to false for 24-hour format
    });

    return localDate;
  };

  return (
    <div className="matches-date-time">
      <p className="matches-time">
        {game.complete > 0
          ? `${game.hscore} - ${game.ascore}`
          : `${convertToLocalTime(game.date).toString()}`}
      </p>
      <p className="matches-date">{formatDate(game.date)}</p>
    </div>
  );
};

export default MatchesDateTime;
