export const radius = 25;
export const increment = 110;

export const getPosition = (radius: number, angle: number) => {
  return {
    x: radius + radius * Math.cos(angle),
    y: radius * Math.sin(angle),
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
