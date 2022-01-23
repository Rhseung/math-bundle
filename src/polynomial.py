import base


class Polynomial:
    coefficients = [0]

    def __init__(self, formula, main_symbol):
        formula = base.Expression(formula)

        # TODO formula에 symbol이 1개면 그 symbol로 main_symbol을 자동 지정
        self.main_symbol = main_symbol

        for term in formula.expr:
            max_degree = len(self.coefficients) - 1
            if term.power > max_degree:
                self.coefficients.extend([0] * (term.power - max_degree))

            self.coefficients[term.power] += term.coeff

    def __str__(self):
        ret = str()

        for i in range(len(self.coefficients) - 1, 0, -1):
            if self.coefficients[i] == 0:
                continue

            ret += f'{self.coefficients[i]}{self.main_symbol.name}^{i} + '

        return ret[:-3]

    # operators
    def __add__(self, other):
        pass

    def __sub__(self, other):
        pass

    def __mul__(self, other):
        pass

    def __truediv__(self, other):
        pass

    def __floordiv__(self, other):
        pass

    def __divmod__(self, other):
        pass

    def __pow__(self, power, modulo=None):
        pass

    def __mod__(self, other):
        pass

    def __pos__(self):
        pass

    def __neg__(self):
        pass

x = base.Symbol('x')
p = Polynomial(x ** 2 ** 2 + 3 * x + x, x)
print(p)
