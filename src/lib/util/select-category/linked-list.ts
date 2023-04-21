import { Link } from './linked-list-link';

export class LinkedList<T> {
  head: Link<T> | null;

  constructor() {
    this.head = null;
  }

  append(elem: T) {
    const element = new Link(elem);
    element.next = this.head;
    this.head = element;
  }

  iter(): T[] {
    const items: T[] = [];
    let current = this.head;

    while (current) {
      items.push(current.elem);
      current = current.next;
    }

    return items;
  }

  get(index: number): T | undefined {
    let current = this.head;
    let count = 0;

    while (current != null) {
      if (count === index) {
        return current.elem;
      }
      count += 1;
      current = current.next;
    }

    return undefined;
  }

  remove(index: number) {
    // remove item at level 2
    let temp = this.head;
    let prev = this.head;

    for (let i = 0; i <= index; i += 1) {
      if (index === 0) {
        if (this.head) {
          this.head = this.head.next;
          temp = null;
          return;
        }
      } else if (i === index && temp) {
        if (prev) {
          prev.next = temp.next;
          temp = null;
          return;
        }
      } else {
        prev = temp;

        // Position was greater than number of nodes in the list
        if (prev === null) {
          break;
        }
        temp = temp ? temp.next : null;
      }
    }
  }
}

export default LinkedList;
