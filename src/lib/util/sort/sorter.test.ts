import { expect, describe, test } from 'vitest';
import { byTextAscending } from './sorter';

describe('Sorting a generic object using byTextAscending', () => {
  type Person = {
    name: string;
    age: number;
  };

  test('Sorting people by name (string) property', () => {
    const unsortedPeople: Person[] = [
      { name: 'Bob', age: 32 },
      { name: 'Andrew', age: 55 },
      { name: 'Caroline', age: 21 },
    ];

    const expectedOrder: Person[] = [
      { name: 'Andrew', age: 55 },
      { name: 'Bob', age: 32 },
      { name: 'Caroline', age: 21 },
    ];

    const sortedPeople = unsortedPeople.sort(
      byTextAscending((person: Person) => person.name),
    );

    expect(sortedPeople[0]).toMatchObject(expectedOrder[0]);
    expect(sortedPeople[1]).toMatchObject(expectedOrder[1]);
    expect(sortedPeople[2]).toMatchObject(expectedOrder[2]);
  });

  test('Sorting people by age (number) property', () => {
    const unsortedPeople: Person[] = [
      { name: 'Bob', age: 32 },
      { name: 'Andrew', age: 55 },
      { name: 'Olga', age: 101 },
      { name: 'Caroline', age: 21 },
    ];

    const expectedOrder: Person[] = [
      { name: 'Olga', age: 101 },
      { name: 'Caroline', age: 21 },
      { name: 'Bob', age: 32 },
      { name: 'Andrew', age: 55 },
    ];

    const sortedPeople = unsortedPeople.sort(
      byTextAscending((person: Person) => person.age.toString()),
    );

    expect(sortedPeople[0]).toMatchObject(expectedOrder[0]);
    expect(sortedPeople[1]).toMatchObject(expectedOrder[1]);
    expect(sortedPeople[2]).toMatchObject(expectedOrder[2]);
    expect(sortedPeople[3]).toMatchObject(expectedOrder[3]);
  });
});
