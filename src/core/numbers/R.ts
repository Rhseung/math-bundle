interface IR {
  nth: number,
  formula: any[],

  number(num: number): R,
  root(nth: number, real: (real: R) => R): R
}

export class R implements IR {
  nth: number;
  formula: any[];
  static make: (func: (real: R) => R) => R;
  
  constructor() {}

  // TODO number를 어떤 타입으로 저장하게 하지
  number (num: number): R {
    let r = new R();
    r.formula.push();

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

function Real () {

}

// 3 + √5 + 14 + ³√(27 + √11)

let r = R.make(real => real
  .number(3)
  .root(2, real => real
    .number(5)
  )
  .number(14)
  .root(3, real => real
    .number(27)
    .root(2, real2 => real2
      .number(11)
    )
  )
);

const real = {
  nth: 1,
  formula: [
    {
      nth: 1,
      formula: 3
    },
    {
      nth: 2,
      formula: 5
    },
    {
      nth: 1,
      formula: 14
    },
    {
      nth: 3,
      formula: [
        {
          nth: 1,
          formula: 27
        },
        {
          nth: 2,
          formula: 11
        }
      ]
    }
  ]
}