export const isNumber = (value: unknown): boolean => {
  if (typeof value !== 'string' || value.trim() === '') {
    return false;
  }
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};
