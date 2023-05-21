import { LinkedList } from './select-category/linked-list';

export function nextEnabled<T>(step: number, state: T): boolean {
  switch (step) {
    case 1:
      if (state instanceof LinkedList) {
        return state.iter().length !== 0;
      }
      break;
    default:
      return false;
  }
  return false;
}

export default nextEnabled;
