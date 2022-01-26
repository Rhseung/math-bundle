import base as e
import polynomial as p
Polynomial = p.Polynomial
Symbol = e.Symbol

def main():
    x = Symbol('x')
    p = Polynomial(x+1, x)

    print(p ** 100)

main()