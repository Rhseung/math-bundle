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
// TODO sign 자동 추론 (속도 보고 결정해)
export class Z implements IZ {
  sign: number;
  ns: number[];
  base: number;

  constructor(number: (string | number | number[]), sign?: number, base?: number) {
    this.sign = (sign == null) ? 1 : sign / Math.abs(sign);
    this.base = (base == null) ? 10 : base; 

    BASE = Math.pow(this.base, BASE_DIGIT);
        
    if (typeof number == 'string' || typeof number == 'number') {
      if (Number(number) % 1 !== 0) throw new Error('Z() 인자에는 정수만 가능');
      if (typeof number == 'number') number = String(number);

      number = number.replace(/ |\+|-/g, '');

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
    return r.replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATOR);
  }

  isPositive (): boolean {
    return this.sign == 1;
  }

  isNegative (): boolean {
    return this.sign == -1;
  }

  negate (): Z {
    return new Z(this.ns, -this.sign);
  }

  add (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.sub(z);
    if (this.isNegative() && z.isPositive()) return z.sub(this);
    
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
    
    console.log(r);
    
    return new Z(r, this.sign);
  }
  
  sub (z: Z): Z {
    if (this.isPositive() && z.isNegative()) return this.add(z);
    if (this.isNegative() && z.isPositive()) return z.add(this);

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

    return new Z(r, this.sign);
  }

  mul (z: Z): Z {
    return new Z(1, +1);
  }
  
  div (z: Z): Z {
    return new Z(1, +1);
  }

  mod (z: Z): Z {
    return new Z(1, +1);
  }

  pow (n: Z): Z { 
    if (n.sign < 0) return new Z(0);
    
    return new Z(0);
  }
}

const z1 = new Z('1036129827349827349872348274');
const z2 = new Z('982349872349872349839184');
console.log(`a = ${z1.toString()}\nb = ${z2.toString()}\na - b = ${z1.sub(z2).toString()}`);