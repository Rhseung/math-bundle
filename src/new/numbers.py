from copy import *
from re import *

class Rational:
    def __init__(self, *args):
        self.n = 0
        self.d = 1

        if len(args) == 0:
            self.n = 0
            self.d = 1

        elif len(args) == 1:
            if isinstance(args[0], Rational):
                self.n = args[0].n
                self.d = args[0].d

            elif isinstance(args[0], tuple) or isinstance(args[0], list):
                self.n = args[0][0]
                self.d = args[0][1]

            elif isinstance(args[0], dict):
                self.n = args[0]['n']
                self.d = args[0]['d']

            elif isinstance(args[0], int):
                self.n = args[0]
                self.d = 1

            elif isinstance(args[0], str) or isinstance(args[0], float):
                pass

        elif len(args) == 2:
            self.n = int(args[0])
            self.d = int(args[1])

        if (self.n >= 0 and self.d <= 0) or (self.n <= 0 and self.d <= 0):
            self.n = -self.n
            self.d = -self.d

        (a, b) = (self.n if self.n >= 0 else -self.n, self.d if self.d >= 0 else -self.d)
        while b != 0:
            tmp = b
            b = a % tmp
            a = tmp
        g = a

        self.n = int(self.n / g)
        self.d = int(self.d / g)

    def __neg__(self):
        return Rational(-self.n, self.d)

    def __invert__(self):
        return Rational(self.d, self.n)

    def __abs__(self):
        return abs(self.n / self.d)

    def __int__(self):
        pass

    def __eq__(self, other):
        other = Rational(other)
        return self.n == other.n and self.d == other.d

    def __add__(self, other):
        other = Rational(other)
        return Rational(
            self.n * other.d + other.n * self.d,
            self.d * other.d
        )

    def __radd__(self, other):
        return other + self

    def __sub__(self, other):
        return self + -other

    def __rsub__(self, other):
        return other + -self

    def __mul__(self, other):
        if isinstance(other, Rational):
            return Rational(self.n * other.n, self.d * other.d)
        elif isinstance(other, Term):
            return other * self

    def __truediv__(self, other):
        return self * ~other

    def __mod__(self, other):
        pass

    def __divmod__(self, other):
        pass

    def __pow__(self, other: int):
        if other >= 0:
            return Rational(self.n ** other, self.d ** other)
        else:
            return ~self ** -other

    def __str__(self):
        return f'{self.n}{("/" + str(self.d)) if self.d != 1 else ""}'

    def __repr__(self):
        return f'{self.n}{("/" + str(self.d)) if self.d != 1 else ""}'


class Term:
    # 4xy -> coeff: 4, term: {'x':1, 'y':1}

    def __init__(self, name):
        self.coeff = Rational(1)
        self.term = {name: Rational(1)}

    def __neg__(self):
        ret = deepcopy(self)
        ret.coeff = -ret.coeff
        return ret

    def __invert__(self):
        ret = deepcopy(self)
        ret.coeff = ~ret.coeff
        for symbol in ret.term:
            ret.term[symbol] = -self.term[symbol]
        return ret

    def __add__(self, other):
        if self.term == other.term:
            ret = deepcopy(self)
            ret.coeff += other.coeff
            if ret.coeff == 0:
                return 0
            else:
                return ret
        else:
            return Expr(self, other)

    def __radd__(self, other):
        # return other + self
        pass

    def __sub__(self, other):
        return self + -other

    def __rsub__(self, other):
        return other + -self

    def __mul__(self, other):
        ret = deepcopy(self)

        if isinstance(other, Term):
            ret.coeff = self.coeff * other.coeff
            ret.term.update(other.term)
            for symbol in ret.term:
                ret.term[symbol] = (self.term[symbol] if symbol in self.term else Rational(0)) + (
                    other.term[symbol] if symbol in other.term else Rational(0))
        elif isinstance(other, Rational) or isinstance(other, int):
            ret.coeff = self.coeff * Rational(other)

        return ret

    def __rmul__(self, other):
        return self * other

    def __truediv__(self, other):
        return self * ~other

    def __mod__(self, other):
        pass

    def __pow__(self, power: int, modulo=None):
        ret = deepcopy(self)
        ret.coeff = ret.coeff ** power
        for symbol in ret.term:
            ret.term[symbol] = ret.term[symbol] * Rational(power)
        return ret

    def __str__(self):
        ret = f'{self.coeff} '
        for symbol in self.term:
            ret += f'{symbol}{("^" + str(self.term[symbol])) if self.term[symbol] != Rational(1) and self.term[symbol] != Rational(0) else ""}'
        return ret

    def __repr__(self):
        return self.__str__()


class Expr:
    # TODO 4 xy + 6 x^2y -> [4, 6], [{x:1,y:1}, {x:2,y:1}]

    def __init__(self, *args):
        self.coeff = []
        self.expr = []
        self.args = []

        for i in args:
            self.coeff.append(i.coeff)
            self.expr.append(i.term)
        self.args += args

    def __add__(self, other):
        ret = deepcopy(self)
        for i in range(len(self.args)):
            if ret.expr[i] == other.term:
                ret.args[i] += other
                ret.coeff[i] += other.coeff
                if ret.coeff[i] == 0:
                    ret.coeff.pop(i)
                    ret.args.pop(i)
                    ret.expr.pop(i)
                    return ret
                else:
                    return ret
        return Expr(*ret.args, other)

    def __str__(self):
        ret = ''
        for i in range(len(self.args)):
            ret += f' + {self.args[i]}'
        return ret[3:]


def Symbols(symbols: str):
    return list(map(Term, compile('[a-zA-Z]+').findall(symbols)))


a, b, c = Symbols("a, b, c")
x, y = Symbols("x, y")
print(4*x*y + 6*(x**2)*y + 6*x*y - 6*(x**2)*y)
print(a * b * c)
print(2*a-a-a+a)
print(a+b+a+a+b-b)
# print(0 + a)    # error
print(a + 0)    # error