export const deepCopy = <T>(source: T): T => {
  return Array.isArray(source)
    ? (source.map((item) => deepCopy(item)) as unknown as T) // Apply deepCopy to each element
    : source instanceof Date
      ? (new Date(source.getTime()) as unknown as T)
      : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce(
            (o, prop) => {
              Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
              o[prop] = deepCopy((source as { [key: string]: unknown })[prop]);
              return o;
            },
            Object.create(Object.getPrototypeOf(source))
          )
        : (source as T);
};
