export const getHours = (time: number) => {
  return Math.floor(time / 3600);
};

export const getMinutes = (time: number) => {
  return Math.floor((time / 60) % 60);
};

export const getSeconds = (time: number) => {
  return time % 60;
};
