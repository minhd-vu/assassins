export default function getKDRatio(elims: number, deaths: number) {
  return (elims / (deaths === 0 ? 1 : deaths)).toFixed(2);
}
