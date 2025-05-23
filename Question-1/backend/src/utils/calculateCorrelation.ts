export const calculateCorrelation = (x: number[], y: number[]) => {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const avgX = calculateAverage(x);
  const avgY = calculateAverage(y);

  const numerator = x.reduce((sum, xi, i) => sum + ((xi - avgX) * (y[i] - avgY)), 0);
  const denominatorX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - avgX) ** 2, 0));
  const denominatorY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - avgY) ** 2, 0));

  return denominatorX && denominatorY ? numerator / (denominatorX * denominatorY) : 0;
};


export const calculateAverage = (arr: number[]): number => {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
};

