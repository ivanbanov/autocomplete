// @flow

export default function debounce(func: Function, wait: number = 175): Function {
  let timeout;

  return (...args: Array<*>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
