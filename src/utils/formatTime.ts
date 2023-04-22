export const formatTime = (seconds: number): string => {
    const rest = (seconds % 60).toFixed(0);
    const min = Math.floor(seconds / 60);
    const restSeconds = parseInt(rest) < 10 ? `0${rest}` : rest;
    return `${min}:${restSeconds}`;
  };