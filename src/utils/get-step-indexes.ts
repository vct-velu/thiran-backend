export const getEnumValues = <T>(enumToDestructure: T): string[] =>
  Object.values(enumToDestructure).filter(
    (value) => typeof value !== 'function',
  );
