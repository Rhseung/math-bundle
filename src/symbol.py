from term import Term

class Symbol:
  def __init__(self, name: str):
    self.name = name
  
  def __mul__(self, num):
    return num * Term(self)
  
  def __rmul__(self, num):
    return num * Term(self)
  
  def __pow__(self, num):
    return Term(self) ** num