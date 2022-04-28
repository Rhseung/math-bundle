class Rational:
    n = 0
    d = 1

    def __init__(self, *args):
        if len(args) == 0:
            self.n = 0
            self.d = 1

        elif len(args) == 1:
            if isinstance(args[0], Rational):
                self = args[0]
            
            elif isinstance(args[0], tuple) or isinstance(args[0], list):
                self.n = args[0][0]
                self.d = args[0][1]

            elif isinstance(args[0], dict):
                self.n = args[0]['n']
                self.d = args[0]['d']

        elif len(args) == 2:
            self.n = int(args[0])
            self.d = int(args[1])
    
    def __neg__(self):
        return Rational(-self.n, self.d)

    def __invert__(self):
        return Rational(self.d, self.n)

    def __abs__(self):
        return abs(self.n / self.d)

    def __add__(self, other):
        return Rational(
            self.n * other.d + other.n * self.d, 
            self.d * other.d
        )

    def __sub__(self, other):        
        return self + -other

    def __mul__(self, other):
        return Rational(self.n * other.n, self.d * other.d)
    
    def __truediv__(self, other):
        return self * ~other
    
    def __pow__(self, other: int):
        if other >= 0:
            return Rational(self.n ** other, self.d ** other)
        else:
            return ~self ** -other

    def __str__(self):
        return f'{self.n}/{self.d}'

    if (n >= 0 and d <= 0) or (n <= 0 and d <= 0):
        n = -n
        d = -d

    (a, b) = (abs(n), abs(d))
    while d != 0:
        tmp = b
        b = a % tmp
        a = tmp
    g = a

    n /= g
    d /= g

a = Rational(3, 4)
b = Rational(1, 7)
c = Rational(8, -12)
print(a, b, c)

# class Expr:
