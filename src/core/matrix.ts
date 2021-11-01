interface IMatrix {};

class Matrix implements IMatrix {
  constructor() {}
}

const sin = (n: number) => Math.sin(n);

let matrix = [
  1,       2, 3,
  sin(30), 8, 19,
  4,       5, 6722
]
/*
┌ 1       2 3    ┐
│ sin(30) 8 19   │
└ 4       5 6722 ┘
*/