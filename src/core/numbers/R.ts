interface IR {
  formula: R[],

  number(num: number): R,
  root(nth: number, real: (real: R) => R): R
}

export class R implements IR {
  formula: R[];
  static make: (func: (real: R) => R) => R;
  
  constructor() {}

  // TODO number를 어떤 타입으로 저장하게 하지
  number (num: number): R {
    let r = new R();
    r.formula.push(3);

    return r;
  }

  root (nth: number, real: (real: R) => R): R {
    
  }
}
R.make = (func) => func(new R());

/* 
 * √(3)+³√(7+⁴√(3))
 * = ²rt(3),³rt(7+⁴rt(3))
 * = = [rt(2, 3), rt(3, [7, rt(4, 3)])]
 */

let r = R.make(real => real
  .number(3)
  .root(2, real => real
    .number(5)
  )
  .number(14)
  .root(3, real => real
    .number(27)
  )
);
// 3 + √5 + 14 + ∛27