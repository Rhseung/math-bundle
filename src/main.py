import base as e
import polynomial as p
Polynomial = p.Polynomial
Symbol = e.Symbol

def main():
    x = Symbol('x') # 미지수 선언
    p1 = Polynomial(2*x + 1) # 다항식 선언
    p2 = Polynomial(x - 1, x)

    print(p1 ** 2)

main()