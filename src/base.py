import copy


class Symbol:
    def __init__(self, name: str):
        self.name = name

    def __mul__(self, num):
        return num * Term(self)

    def __rmul__(self, num):
        return num * Term(self)

    def __pow__(self, num):
        return Term(self) ** num


class Term:
    coeff = 1
    power = 1

    def __init__(self, ctx):
        if isinstance(ctx, Symbol):
            self.name = ctx.name

        if isinstance(ctx, Term):
            self.name = ctx.name
            self.coeff = ctx.coeff
            self.power = ctx.power

    # operators
    def __mul__(self, num):
        ret = copy.deepcopy(self)
        ret.coeff = self.coeff * num
        ret.power = self.power
        return ret

    def __rmul__(self, num):
        ret = copy.deepcopy(self)
        ret.coeff = self.coeff * num
        ret.power = self.power
        return ret

    def __pow__(self, num):
        ret = copy.deepcopy(self)
        ret.coeff = self.coeff
        ret.power = self.power * num
        return ret

    def __add__(self, other):
        return Expression(self) + Expression(other)

    def __radd__(self, other):
        return Expression(self) + Expression(other)

    # utils
    def __str__(self) -> str:
        return '%d%s^%d' % (self.coeff, self.name, self.power)


class Expression:
    expr = []

    def __init__(self, ctx):
        if isinstance(ctx, Symbol):
            ctx = Term(ctx)

        if isinstance(ctx, Term):
            self.expr = [ctx]

        if isinstance(ctx, Expression):
            self.expr = ctx.expr

    # operators
    def __add__(self, other):
        ret = copy.deepcopy(self)
        ret.expr.extend(Expression(other).expr)
        return ret

    def __str__(self):
        ret = [t.__str__() for t in self.expr]
        return str(ret)
