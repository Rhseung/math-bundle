interface IZ {
  sign: number,
  ns: number[],

  toString(): string,
  isPositive(): boolean,
  isNegative(): boolean,
  negate(): Z,
  add(z: Z): Z,
  sub(z: Z): Z,
  mul(z: Z): Z,
  div(z: Z): Z,
  mod(z: Z): Z,
  pow(z: Z): Z,
}

const BASE_DIGIT = 7;
const SEPARATOR = ' ';
var BASE = Math.pow(10, BASE_DIGIT);

// TODO base N 구현 (base -N 도 가능해야함)
export class Z implements IZ {
  sign: number;
  base: number;
  ns: number[];

  static minusOne: Z;
  static zero: Z;
  static one: Z;

  constructor(number: (string | number | number[]), sign: number, base: number) {
    this.sign = sign;
    this.base = base;
    
    BASE = Math.pow(base, BASE_DIGIT);
        
    if (typeof number == 'string' || typeof number == 'number') {
      if (Number(number) % 1 !== 0) throw new Error('Z() 인자에는 정수만 가능');
      if (typeof number == 'number') number = String(number);

      let chucks = new Array<string>();    
      while (number.length != 0) {
        let chucklen: number = (number.length % BASE_DIGIT == 0) ? BASE_DIGIT : number.length % BASE_DIGIT;
        chucks.push(number.slice(0, chucklen));
        number = number.slice(chucklen);
      }

      this.ns = chucks.map(Number).reverse();
    }
    else if (Array.isArray(number)) {
      this.ns = number;
    }
  }

  toString (): string {
    let r = '';
    this.ns.forEach(e => r = e + r);
    return ((this.sign > 0) ? '+' : '-') + r.replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR);
  }

  isPositive (): boolean {
    return this.sign == 1;
  }

  isNegative (): boolean {
    return this.sign == -1;
  }

  negate (): Z {
    return new Z(this.ns, -this.sign, this.base);
  }

  add (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.sub(z.negate());
    if (this.isNegative() && z.isPositive()) return z.sub(this.negate());
    
    let a, b;
    if (this.ns.length < z.ns.length) [a, b] = [z.ns, this.ns];
    else [a, b] = [this.ns, z.ns];
  
    let r = new Array<number>(a.length);
  
    let i = 0,
        carry = 0,
        sum = 0;
  
    for (i = 0; i < b.length; i++) {
      sum = a[i] + b[i] + carry;
      carry = (sum >= BASE) ? 1 : 0;
      r[i] = sum - carry * BASE;
    }
  
    while (i < a.length) {
      sum = a[i] + carry;
      carry = (sum == BASE) ? 1 : 0;
      r[i] = sum - carry * BASE;
      i++;
    }
  
    if (carry > 0) r.push(carry);
    
    return new Z(r, this.sign, this.base);
  }
  
  sub (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.add(z.negate());
    if (this.isNegative() && z.isPositive()) return z.add(this.negate());
    if (this.isNegative() && z.isNegative()) return z.negate().sub(this.negate());

    let a, b, sign;
    if (this.ns.length < z.ns.length) [a, b, sign] = [z.ns, this.ns, -1];
    else [a, b, sign] = [this.ns, z.ns, +1];

    let r = new Array<number>(a.length);

    let i = 0,
        borrow = 0,
        diff = 0;

    for (i = 0; i < b.length; i++) {
      diff = a[i] - borrow - b[i];
      if (diff < 0) {
        diff += BASE;
        borrow = 1;
      }
      else {
        borrow = 0;
      }
      r[i] = diff;
    }

    for (i = b.length; i < a.length; i++) {
      diff = a[i] - borrow;
      if (diff < 0) {
        diff += BASE;
      }
      else {
        r[i++] = diff;
        break;
      }
      r[i] = diff;
    } 

    for (; i < a.length; i++) {
      r[i] = a[i];
    }

    return new Z(r, this.sign, this.base);
  }


  // TODO Karatsuba!!
  mul (z: Z): Z {
    return new Z(this.ns, this.sign, this.base);
  }
  
  div (z: Z): Z {
    return new Z(this.ns, this.sign, this.base);
  }

  mod (z: Z): Z {
    return new Z(this.ns, this.sign, this.base);
  }

  pow (n: Z): Z { 
    if (n.sign < 0) return Z.zero;
    
    return new Z(this.ns, this.sign, this.base);
  }
}
Z.minusOne = new Z(1, -1, 10);
Z.zero = new Z(0, +1, 10);
Z.one = new Z(1, +1, 10);

function Integer (number: (number | string), base: number = 10): Z {
  number = String(number);
  
  let sign = +1;
  if (number.startsWith('+')) sign = +1;
  if (number.startsWith('-')) sign = -1;
      
  number = number.replace(/^(\+|\-)/g, '').replace(/ |_/g, '');

  return new Z(number, sign, base);
}

const z1: Z = Integer(1);
const z2: Z = Integer(4);
console.log(z1);
console.log(z2);
console.log(z1.add(z2).toString());