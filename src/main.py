import base as e
import polynomial as p

def main():
    x = e.Symbol('x')
    term = 3 * (x ** 2) + 7 * x
    po = p.Polynomial(term)

    print(po)

main()