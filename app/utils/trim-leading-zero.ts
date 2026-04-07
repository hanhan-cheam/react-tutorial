export const trimLeadingZeros = (value: string): string => {
  // If value is all zeros or empty, return "0"
  if (/^0+$/.test(value) || value === '') return '0';
  // Remove leading zeros
  return value.replace(/^0+/, '');
};
