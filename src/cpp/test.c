#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <Windows.h>
#include <math.h>

#define SIZE 10

void print_binary(int n) {
    if (n > 1) print_binary(n / 2);
    printf("%d", n % 2);
}

int main() {
    int number;

    printf("enter number: ");
    scanf("%d", &number);

    print_binary(number);

    return 0;
}