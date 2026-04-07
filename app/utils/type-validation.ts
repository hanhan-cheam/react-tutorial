// return type predicate is preferred than boolean
// reference: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export function isNullOrEmptyString(val: unknown): val is '' | null | undefined {
  return val === '' || val === null || val === undefined;
}

export function isNumber(val: unknown): val is number {
  return val !== null && !isNaN(val as number) && val !== undefined;
}

export const isJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};
