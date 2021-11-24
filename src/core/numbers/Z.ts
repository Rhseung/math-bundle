interface IZ {
  sign: number,
  cabinet: number[],

  toString(): string,

  isPositive(): boolean,
  isNegative(): boolean,

  equals(z: Z): boolean,
  eq(z: Z): boolean,

  greater(z: Z): boolean,
  gt(z: Z): boolean,

  lesser(z: Z): boolean,
  lt(z: Z): boolean,

  greaterOrEquals(z: Z): boolean,
  geq(z: Z): boolean,

  lesserOrEquals(z: Z): boolean,
  leq(z: Z): boolean,

  negate(): Z,
  abs(): Z,

  add(z: Z): Z,
  plus(z: Z): Z,

  sub(z: Z): Z,
  minus(z: Z): Z,

  mul(z: Z): Z,
  times(z: Z): Z,

  div(z: Z): Z,
  divide(z: Z): Z,

  mod(z: Z): Z,
  modulo(z: Z): Z,

  pow(z: Z): (Z | RangeError),
  power(z: Z): (Z | RangeError),
}

const SEPARATOR = ' ';
const D = 3;
var B = 10 ** D;

// TODO base N 구현 (base -N 도 가능해야함)
export class Z implements IZ {
  sign: number;
  base: number;
  cabinet: number[];

  constructor(number: (string | number[]), sign: number, base: number) {
    this.sign = sign;
    this.base = base;
    B = base ** D;

    if (typeof number == 'string') {
      if (Number(number) % 1 !== 0) throw new Error('Z() 인자에는 정수만 가능');

      let chucks = new Array<string>();    
      while (number.length != 0) {
        let chucklen: number = (number.length % D == 0) ? D : number.length % D;
        chucks.push(number.slice(0, chucklen));
        number = number.slice(chucklen);
      }
      this.cabinet = chucks.map(Number).reverse();
    }

    else if (number instanceof Array) {
      this.cabinet = number;
    }

    if (this.cabinet.length == 1 && this.cabinet[0] == 0) this.sign = 1;
  }

  toString (): string {
    let r = '';
    this.cabinet.forEach(e => r = e + r);
    return ((this.sign > 0) ? '+' : '-') + r.replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR);
  }

  isPositive (): boolean {
    return this.sign == 1;
  }

  isNegative (): boolean {
    return this.sign == -1;
  }

  equals (z: Z): boolean {
    if (this.sign != z.sign) return false;
    return z.cabinet.every((e, i) => e == this.cabinet[i]);
  }
  eq (z: Z): boolean { return this.equals(z); }

  greater (z: Z): boolean {
    if (this.isPositive() && z.isNegative()) return true;
    if (this.isNegative() && z.isPositive()) return false;

    if (this.isPositive()) {
      if (this.cabinet.length > z.cabinet.length) return true;
      if (this.cabinet.length == z.cabinet.length && this.cabinet[this.cabinet.length - 1] > z.cabinet[z.cabinet.length - 1]) return true;
      return false;
    }

    else if (this.isNegative()) {
      return (this.negate()).lesser(z.negate());
    }
  }
  gt (z: Z): boolean { return this.greater(z) };

  lesser (z: Z): boolean {
    if (this.isPositive() && z.isNegative()) return false;
    if (this.isNegative() && z.isPositive()) return true;

    if (this.isPositive()) {
      if (this.cabinet.length < z.cabinet.length) return true;
      if (this.cabinet.length == z.cabinet.length && this.cabinet[this.cabinet.length - 1] < z.cabinet[z.cabinet.length - 1]) return true;
      return false;
    }

    else if (this.isNegative()) {
      return (this.negate()).greater(z.negate());
    }
  }
  lt (z: Z): boolean { return this.lesser(z) };

  geq (z: Z): boolean {
    if (this.isPositive() && z.isNegative()) return true;
    if (this.isNegative() && z.isPositive()) return false;

    if (this.isPositive()) {
      if (this.cabinet.length > z.cabinet.length) return true;
      if (this.cabinet.length == z.cabinet.length && this.cabinet[this.cabinet.length - 1] >= z.cabinet[z.cabinet.length - 1]) return true;
      return false;
    }

    else if (this.isNegative()) {
      return (this.negate()).leq(z.negate());
    }
  }
  greaterOrEquals (z: Z): boolean { return this.geq(z) };

  leq (z: Z): boolean {
    if (this.isPositive() && z.isNegative()) return false;
    if (this.isNegative() && z.isPositive()) return true;

    if (this.isPositive()) {
      if (this.cabinet.length < z.cabinet.length) return true;
      if (this.cabinet.length == z.cabinet.length && this.cabinet[this.cabinet.length - 1] < z.cabinet[z.cabinet.length - 1]) return true;
      return false;
    }

    else if (this.isNegative()) {
      return (this.negate()).geq(z.negate());
    }
  }
  lesserOrEquals (z: Z): boolean { return this.leq(z) };

  negate (): Z {
    return new Z(this.cabinet, -this.sign, this.base);
  }

  abs (): Z {
    if (this.isNegative()) return this.negate();
    else return this;
  }

  add (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.sub(z.negate());
    if (this.isNegative() && z.isPositive()) return z.sub(this.negate());
    
    let a, b;
    if (this.cabinet.length < z.cabinet.length) [a, b] = [z.cabinet, this.cabinet];
    else [a, b] = [this.cabinet, z.cabinet];
  
    let r = new Array<number>(a.length);
  
    let i = 0,
        carry = 0,
        sum = 0;
  
    for (i = 0; i < b.length; i++) {
      sum = a[i] + b[i] + carry;
      carry = (sum >= B) ? 1 : 0;
      r[i] = sum - carry * B;
    }
  
    while (i < a.length) {
      sum = a[i] + carry;
      carry = (sum == B) ? 1 : 0;
      r[i] = sum - carry * B;
      i++;
    }
  
    if (carry > 0) r.push(carry);
    
    return new Z(r, this.sign, this.base);
  }
  plus (z: Z): Z { return this.add(z) };
  
  sub (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.add(z.negate());
    if (this.isNegative() && z.isPositive()) return z.add(this.negate());
    if (this.isNegative() && z.isNegative()) return z.negate().sub(this.negate());

    let a, b, sign;
    if (this.cabinet.length < z.cabinet.length) [a, b, sign] = [z.cabinet, this.cabinet, -1];
    else [a, b, sign] = [this.cabinet, z.cabinet, +1];

    let r = new Array<number>(a.length);

    let i = 0,
        borrow = 0,
        diff = 0;

    for (i = 0; i < b.length; i++) {
      diff = a[i] - borrow - b[i];
      if (diff < 0) {
        diff += B;
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
        diff += B;
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
  minus (z: Z): Z { return this.sub(z) };

  // TODO Karatsuba!!
 /*
  * B = 10^D, D = 3
  * 12345 = 12 * B^1 + 345 * B^0
  * 6789 = 6 * B^1 + 789 * B^0
  * 
  * p = 12 * 6 = 72
  * q = 345 * 789 = 272205
  * r = (12 + 345) * (6 + 789) - (p + q) = 11538
  * 
  * 12345 * 6789 = p * B^2 + q * B^1 + r * B^0 = (72 + 272) * B^2 + (205 + 11) * B^1 + 538 * B^0
  */
  mul (z: Z): Z {
    return new Z(this.cabinet, this.sign, this.base);
  }
  times (z: Z): Z { return this.mul(z) };
  
  div (z: Z): Z {
    return new Z(this.cabinet, this.sign, this.base);
  }
  divide (z: Z): Z { return this.div(z) };

  mod (z: Z): Z {
    return new Z(this.cabinet, this.sign, this.base);
  }
  modulo (z: Z): Z { return this.mod(z) };

  // TODO
  pow (n: Z): (Z | RangeError) { 
    if (n.isNegative()) return new RangeError("non element of Z");
    
    return new Z(this.cabinet, this.sign, this.base);
  }
  power (z: Z): (Z | RangeError) { return this.pow(z) };
}

function Integer (number: (number | string | Z), base: number = 10): Z {
  if (number instanceof Z) return new Z(number.cabinet, number.sign, number.base);
  if (number == '-0') return new Z('0', +1, base);
  
  let sign = +1;
  number = String(number);
  if (number.startsWith('+')) sign = +1;
  if (number.startsWith('-')) sign = -1;
  number = number.replace(/^(\+|\-)/g, '').replace(/ |_/g, '');

  return new Z(number, sign, base);
}

console.log(Integer(12345));