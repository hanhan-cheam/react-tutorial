export const isNullOrEmptyString = (val: unknown): val is '' | null | undefined => {
  return (
    val === '' ||
    val === null ||
    val === undefined ||
    (typeof val === 'string' && val.trim() === '')
  );
};
