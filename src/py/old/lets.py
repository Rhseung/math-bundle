import random

TRY = 1000000

count = 0
total = 0
arr = [0] * TRY

i = 0
while i < TRY:
    while True:
        total += random.random()
        count += 1

        if total >= 1:
            break
    print(f'case {i+1}, {count} try -> {total}')

    arr[i] = count
    total = 0
    count = 0

    i+=1

print(sum(arr) / TRY)