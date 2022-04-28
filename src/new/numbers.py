3*x + 1

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
    
    def __add__(self, other):
    def __sub__(self, other):        
    def __mul__(self, other):
    
    '''
    gcd(21, 14):
    21 14
    14 21%14=7
    7 14%7=0
    '''

    (a, b) = (n, d)
    while d != 0:
        tmp = b
        b = a % tmp
        a = tmp
    g = a

    n /= g
    d /= g

class Expr:
