export const byTextAscending =
  <T>(getTextProperty: (object: T) => string) =>
  (objectA: T, objectB: T) => {
    const upperA = getTextProperty(objectA).toUpperCase();
    const upperB = getTextProperty(objectB).toUpperCase();
    if (upperA < upperB) {
      return -1;
    }
    if (upperA > upperB) {
      return 1;
    }
    return 0;
  };

export default byTextAscending;
