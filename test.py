import math as m

n1 = int(input('n1: '));
n2 = int(input('n2: '));

n1_a = [m.floor(n1 / 1000), n1 % 1000]
n2_a = [m.floor(n2 / 1000), n2 % 1000]

A = n1_a[0] * n2_a[0]
B = n1_a[1] * n2_a[1]
C = (n1_a[0] + n1_a[1]) * (n2_a[0] + n2_a[1])
D = C - A - B

print(A * (1000 ** 2) + D * (1000 ** 1) + B)