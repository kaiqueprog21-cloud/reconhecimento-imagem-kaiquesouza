def calculate_statistics(numbers_list):
    """
    Calcula estatísticas básicas de uma lista de números.

    Args:
        numbers_list (list): Lista de números (int ou float).

    Returns:
        tuple: (soma_total, media, valor_maximo, valor_minimo)

    Raises:
        ValueError: Se a lista estiver vazia.
        TypeError: Se a lista contiver elementos não numéricos.
    """
    if not numbers_list:
        raise ValueError("A lista não pode estar vazia.")

    # Calcula a soma total usando a função built-in sum()
    total_sum = sum(numbers_list)

    # Calcula a média
    average = total_sum / len(numbers_list)

    # Encontra o valor máximo e mínimo usando funções built-in
    maximum = max(numbers_list)
    minimum = min(numbers_list)

    return total_sum, average, maximum, minimum


def main():
    """
    Função principal para demonstrar o cálculo de estatísticas.
    """
    # Lista de exemplo
    numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

    # Calcula as estatísticas
    total, avg, max_val, min_val = calculate_statistics(numbers)

    # Imprime os resultados
    print(f"Total: {total}")
    print(f"Média: {avg}")
    print(f"Maior: {max_val}")
    print(f"Menor: {min_val}")


if __name__ == "__main__":
    main()