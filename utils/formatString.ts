export const firstUpperCase = (value: string) => {
  if (!value) return;
  const arrayValue = value.split(' ');
  return arrayValue
    .map((vlr) => vlr.charAt(0).toUpperCase() + vlr.slice(1).toLowerCase())
    .join(' ');
};
