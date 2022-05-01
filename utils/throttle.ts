export default function throttle(callback: (...params: any[]) => any, delay: number = 1000) {
  let shouldWait = false;
  let waitingArgs: any[] | null;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return function (this: any, ...args: any[]) {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback.apply(this, args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}
