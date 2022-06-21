import py.old.base as base
import copy

class Polynomial:
    def __init__(self, formula=None, main_symbol=None):
        # TODO main_symbol이 [x, y] 같이 리스트 타입도 가능케 하기


        self.coefficients = [0]
        formula = base.Expression(formula)

        if main_symbol is None:
            main_symbol = base.Symbol(formula.expr[0].name)
        
        #if isinstance(main_symbol, str): main_symbol = [main_symbol]
        # TODO formula에 symbol이 1개면 그 symbol로 main_symbol을 자동 지정
        self.main_symbol = main_symbol

        for term in formula.expr:
            max_degree = len(self.coefficients) - 1
            if term.power > max_degree:
                self.coefficients.extend([0] * (term.power - max_degree))

            self.coefficients[term.power] += term.coeff

    def __str__(self):
        ret = str()

        for i in range(len(self.coefficients) - 1, -1, -1):
            if self.coefficients[i] == 0:
                continue

            coeff_str = "" if self.coefficients[i] == 1 and i != 0 else self.coefficients[i]
            symbol_str = "" if i == 0 else self.main_symbol.name
            power_str = "" if i == 1 or i == 0 else f"{i}"
            power_str = power_str.replace('0', '⁰')\
                .replace('1', '¹')\
                .replace('2', '²')\
                .replace('3', '³')\
                .replace('4', '⁴')\
                .replace('5', '⁵')\
                .replace('6', '⁶')\
                .replace('7', '⁷')\
                .replace('8', '⁸')\
                .replace('9', '⁹')

            ret += f'{coeff_str}{symbol_str}{power_str} + '

        return ret[:-3]

    # operators
    def __add__(self, other):
        if len(self.coefficients) >= len(other.coefficients):
            ret = copy.deepcopy(self)
            otherp = copy.deepcopy(other)
        else:
            ret = copy.deepcopy(other)
            otherp = copy.deepcopy(self)

        for i in range(len(otherp.coefficients)):
            ret.coefficients[i] += otherp.coefficients[i]

        return ret

    def __sub__(self, other):
        return self + -other

    def __mul__(self, other):
        # TODO main_symbol이 다르면 [self.main_symbol, other.main_symbol] 로 main_symbol 정하기

        ret = Polynomial(None, self.main_symbol)
        sum_degree = (len(self.coefficients) - 1) + (len(other.coefficients) - 1)
        ret.coefficients = [0] * (sum_degree + 1)

        for i in range(len(self.coefficients)):
            for j in range(len(other.coefficients)):
                ret.coefficients[i + j] += self.coefficients[i] * other.coefficients[j]

        return ret

    def __truediv__(self, other):
        pass

    def __floordiv__(self, other):
        pass

    def __divmod__(self, other):
        pass

    def __pow__(self, power: int, modulo=None):
        ret = copy.deepcopy(self)

        for i in range(power - 1):
            ret *= self

        return ret

    def __mod__(self, other):
        pass

    def __neg__(self):
        self_copied = copy.deepcopy(self)
        self_copied.coefficients = list(map(lambda x: -x, self_copied.coefficients))

        return self_copied

    def solve(self, ):
        pass

    def collect(self):
        pass