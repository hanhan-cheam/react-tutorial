/**
 * Creates an object with only the defined parameters
 * Filters out undefined, null, or falsy values
 * @param params Object containing potential optional parameters
 * @returns Object with only defined parameters
 */
export const filterOptionalParams = <T extends Record<string, unknown>>(
  params: T
): Partial<Record<keyof T, NonNullable<T[keyof T]>>> => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '' && !Number.isNaN(value)
    )
  ) as Partial<Record<keyof T, NonNullable<T[keyof T]>>>;
};
