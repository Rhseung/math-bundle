from symbol import Symbol
from expr import Expr

class Term:
  coeff = 1
  power = 1

  def __init__(self, ctx: Symbol):
    self.name = ctx.name

  # set
  def setCoeff(self, coeff):
    self.coeff = coeff
    return self

  def setName(self, name):
    self.name = name
    return self
  
  def setPower(self, power):
    self.power = power
    return self

  # operators
  def __mul__(self, num):
    return Term(self).setCoeff(self.coeff * num).setPower(self.power)

  def __rmul__(self, num):
    return Term(self).setCoeff(self.coeff * num).setPower(self.power)

  def __pow__(self, num):
    return Term(self).setCoeff(self.coeff).setPower(self.power * num)

  def __add__(self, other):
    return Expr(self) + Expr(other)

  # utils
  def __str__(self) -> str:
    return '%d%s^%d' % (self.coeff, self.name, self.power)