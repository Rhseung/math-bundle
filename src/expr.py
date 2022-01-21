from term import Term
import copy

class Expr:
  def __init__(self, expr: Term):
    self.expr = [expr]

  # operators
  def __add__(self, other):
    ret = copy.deepcopy(self)
    ret.expr.extend(other.expr)
    return ret
  
  def __str__(self):
    ret = [term.__str__() for term in self.expr]
    res = ret[0]
    for i in range(1, len(ret)): res += ' + ' + ret[i]
    return res