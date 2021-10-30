// TODO 모든 number => Z 로 바꿔
import { Z } from './Z';

interface IQ {
  numerator: number,
  denominator: number,
  sign: number,

  toString(isMixed?: boolean): string,
  toBeautifyString(isJoin?: boolean): (string[] | string),
  toContinuedFraction(): string,
  value(): number,
  inverse(): Q,
  negate(): Q,
  isEqual(q: Q): boolean,
  isBigger(q: Q): boolean,
  isSmaller(q: Q): boolean,
  add(q: Q): Q,
  sub(q: Q): Q,
  mul(q: Q): Q,
  div(q: Q): Q,
  mod(q: Q): Q,
  pow(z: Z): Q
}

const base_gcd = (a: number, b: number): number => (!b) ? a : base_gcd(b, a % b);
const base_lcm = (a: number, b: number): number => a * b / base_gcd(a, b);
const toMonospace = (s: string): string => s
  .replace(/0/g, '𝟶')
  .replace(/1/g, '𝟷')
  .replace(/2/g, '2')
  .replace(/3/g, '3')
  .replace(/4/g, '4')
  .replace(/5/g, '5')
  .replace(/6/g, '6')
  .replace(/7/g, '7')
  .replace(/8/g, '8')
  .replace(/9/g, '9');

export class Q implements IQ {
  numerator: number;
  denominator: number;

  constructor(numerator: number, denominator: number) {
    if (denominator == 0) throw "Divide By Zero Error";

    this.numerator = Math.abs(numerator) * (((numerator * denominator) > 0) ? 1 : -1);
    this.denominator = Math.abs(denominator);

    let gcdOfND: number = base_gcd(Math.abs(this.numerator), Math.abs(this.denominator));
    this.numerator /= gcdOfND; this.denominator /= gcdOfND;
  }

  get sign () {
    return (this.numerator * this.denominator >= 0) ? 1 : -1;
  };

  toString (isMixed?: boolean): string {
    return isMixed ?
    `${Math.floor(this.value())} ${this.sub(new Q(Math.floor(this.value()), 1)).toString()}` :
    `${this.numerator}/${this.denominator}`;
  };

  toBeautifyString (isJoin?: boolean): (string[] | string) {
    let lines = ['', '', ''];

    if (this.sign == -1) {
      lines[0] += '  ';
      lines[1] += '- ';
      lines[2] += '  ';
    }

    lines[0] += toMonospace(String(Math.abs(this.numerator)));
    lines[1] += '━'.repeat(Math.max(String(Math.abs(this.numerator)).length, String(Math.abs(this.denominator)).length));
    lines[2] += toMonospace(String(Math.abs(this.denominator)));

    return (isJoin) ? lines.join('\n') : lines;
  };

  toContinuedFraction (): string {
    return '';
  };

  value (): number {
    return this.numerator / this.denominator;
  };

  inverse (): Q {
    return new Q(this.denominator, this.numerator);
  };

  negate (): Q {
    return new Q(-this.numerator, this.denominator);
  };

  isEqual (q: Q): boolean {
    return this.numerator == q.numerator && this.denominator == q.denominator;
  };

  isBigger (q: Q): boolean {
    let lcmOfDD = base_lcm(this.denominator, q.denominator);
    return (this.numerator * (lcmOfDD / this.denominator)) > (q.numerator * (lcmOfDD / q.denominator));
  };

  isSmaller (q: Q): boolean {
    let lcmOfDD = base_lcm(this.denominator, q.denominator);
    return (this.numerator * (lcmOfDD / this.denominator)) < (q.numerator * (lcmOfDD / q.denominator));
  };

  add (q: Q): Q {
    let lcmOfDD = base_lcm(this.denominator, q.denominator);
    return new Q((this.numerator * (lcmOfDD / this.denominator)) + (q.numerator * (lcmOfDD / q.denominator)), lcmOfDD);
  };

  sub (q: Q): Q {
    return this.add(q.negate());
  };

  mul (q: Q): Q {
    return new Q(this.numerator * q.numerator, this.denominator * q.denominator);
  };

  div (q: Q): Q {
    return this.mul(q.inverse());
  };

  mod (q: Q): Q {
    let lcmOfDD = base_lcm(this.denominator, q.denominator);
    return new Q((this.numerator * (lcmOfDD / this.denominator)) % (q.numerator * (lcmOfDD / q.denominator)), lcmOfDD);
  };

  pow (z: Z): Q {
    return new Q(1, 1); // todo
  };
}

// FIXME 순환소수 오류남
function Rationalize (parse: (number | string)): Q {
  parse = (typeof parse != "string") ? String(parse) : parse;

  const matched = (parse.match(/(-?\d+)(?:.(\d+)(?:'(\d+)')?)?/) || []).slice(1).map(e => e || '');
  const FRONT = matched[0];
  const IN = matched[1];
  const REPEAT = matched[2] || '0';

  return new Q(
    Number(FRONT + IN + REPEAT) - Number(FRONT + IN),
    Math.pow(10, IN.length) * (Math.pow(10, REPEAT.length) - 1)
  );
}

const q1: Q = Rationalize("0.'142857'");
console.log(q1.toString());