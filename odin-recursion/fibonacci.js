function fibs(argNumber) {
  let num1 = 0;
  let num2 = 1;
  let sum = 0;
  let fib = [num1, num2];
  switch (argNumber) {
    case 0:
      return "???";
    case 1:
      return [num1];
    case 2:
      return [num1, num2];
    default:
      for (let i = 2; i < argNumber; i++) {
        sum = num1 + num2;
        fib.push(sum);
        num1 = num2;
        num2 = sum;
      }
      return fib;
  }
}

function fibsRec(argNumber) {
  if (argNumber < 2) return argNumber;
  else return fibsRec(argNumber - 1) + fibsRec(argNumber - 2);
}
