import { beforeEach, describe, expect, test } from 'vitest';
import { LinkedList } from './linked-list';

describe('test linked list', () => {
  const linkedList = new LinkedList<number>();

  beforeEach(() => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
  });

  test('Test general flow', async () => {
    expect(linkedList.head?.elem).toBe(3);
    expect(linkedList.head?.next?.elem).toBe(2);
    expect(linkedList.head?.next?.next?.elem).toBe(1);
  });

  test('Test remove first', () => {
    linkedList.remove(0);
    expect(linkedList.head?.elem).toBe(2);
    expect(linkedList.head?.next?.elem).toBe(1);
  });

  test('Test remove arbitrary', () => {
    linkedList.remove(1);
    expect(linkedList.head?.elem).toBe(3);
    expect(linkedList.head?.next?.elem).toBe(1);
  });

  test('Get item', () => {
    linkedList.append(4);
    let node = linkedList.get(1);
    expect(node).not.toBeNull();
    if (node) {
      expect(node).toBe(3);
    }
    node = linkedList.get(2);
    expect(node).not.toBeNull();
    if (node) {
      expect(node).toBe(2);
    }
  });
});
