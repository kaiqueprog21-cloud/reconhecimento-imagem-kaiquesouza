def is_primo(number: int) -> bool:
    """
    Verifica se um número é primo.

    Um número primo é um número natural maior que 1 que não tem divisores positivos
    além de 1 e ele mesmo.

    Args:
        number (int): O número a ser verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.

    Raises:
        ValueError: Se o número for negativo (opcional, mas pode ser adicionado).

    Exemplos:
        >>> is_primo(2)
        True
        >>> is_primo(4)
        False
    """
    # Números menores ou iguais a 1 não são primos
    if number <= 1:
        return False

    # 2 e 3 são primos
    if number <= 3:
        return True

    # Elimina múltiplos de 2 e 3
    if number % 2 == 0 or number % 3 == 0:
        return False

    # Verifica divisores da forma 6k ± 1 até a raiz quadrada do número
    current_divisor = 5
    while current_divisor * current_divisor <= number:
        if number % current_divisor == 0 or number % (current_divisor + 2) == 0:
            return False
        current_divisor += 6

    return True


def main():
    """
    Função principal para testar a função is_primo com alguns exemplos.
    """
    test_numbers = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20]
    print("Verificação de números primos:")
    for num in test_numbers:
        result = "primo" if is_primo(num) else "não primo"
        print(f"{num}: {result}")


if __name__ == "__main__":
    main()
