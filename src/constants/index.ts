export const deltaThreshold = 75;
export const radius = 25;
export const increment = 110;

export const getPlanetPosition = (radius: number, angle: number) => {
  return {
    left: `${radius + radius * Math.cos(angle)}px`,
    bottom: `${radius * Math.sin(angle)}px`,
  };
};

export const getAngles = (length: number) => {
  let angles = [];

  const slice = Math.PI / (length + 1);

  for (let i = 0; i < length + 1; i++) {
    angles.push(slice * i);
  }

  return angles.reverse();
};
