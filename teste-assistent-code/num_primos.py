def is_primo(numero: int) -> bool:
    """Retorna True se o número for primo, caso contrário False."""
    if numero <= 1:
        return False
    if numero <= 3:
        return True
    if numero % 2 == 0 or numero % 3 == 0:
        return False
    divisor = 5
    while divisor * divisor <= numero:
        if numero % divisor == 0 or numero % (divisor + 2) == 0:
            return False
        divisor += 6
    return True


if __name__ == "__main__":
    teste_numeros = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20]
    for n in teste_numeros:
        print(f"{n}: {'primo' if is_primo(n) else 'não primo'}")
