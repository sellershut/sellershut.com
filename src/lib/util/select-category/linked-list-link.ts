export class Link<T> {
  elem: T;

  next: Link<T> | null;

  constructor(elem: T, next: Link<T> | null = null) {
    this.elem = elem;
    this.next = next;
  }
}

export default Link;
