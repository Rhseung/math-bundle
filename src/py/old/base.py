import copy

class Symbol:
    def __init__(self, name: str):
        self.name = name

    def __mul__(self, num):
        return num * Term(self)

    def __rmul__(self, num):
        return num * Term(self)

    def __add__(self, num):
        return Term(self) + num

    def __radd__(self, num):
        return Term(self) + num

    def __pow__(self, num):
        return Term(self) ** num


class Term:
    coeff = 1
    power = 1

    def __init__(self, ctx):
        # todo float도 해줘야됨
        if isinstance(ctx, int):
            # todo 1 같은거 처리 어케하지
            self.name = 'x'
            self.coeff = ctx
            self.power = 0

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

# todo Tree Form Expression
class Expression:
    expr = []

    def __init__(self, ctx=None):
        # todo float도 해줘야됨
        if isinstance(ctx, int):
            ctx = Term(ctx)

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
