# Explicação do Código Python: Verificação de Números Primos

Este documento explica o código presente no arquivo `num_primos.py`, que implementa uma função para verificar se um número é primo usando Python, seguindo princípios de Clean Code.

## Visão Geral do Código

O código define uma função chamada `is_primo` que recebe um número inteiro e retorna `True` se o número for primo, ou `False` caso contrário. Há também uma função `main` para testes, e o bloco `if __name__ == "__main__"` para executar os testes quando o script é rodado diretamente.

## Função `is_primo`

```python
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
```

### Explicação Passo a Passo

1. **Definição da Função**:
   - A função `is_primo` recebe um parâmetro `number` do tipo `int` e retorna um `bool`.
   - A docstring detalhada inclui descrição, argumentos, retorno, exemplos e possíveis exceções.

2. **Verificações Iniciais**:
   - `if number <= 1: return False`: Números menores ou iguais a 1 não são primos.
   - `if number <= 3: return True`: 2 e 3 são primos.

3. **Verificação de Divisibilidade por 2 e 3**:
   - `if number % 2 == 0 or number % 3 == 0: return False`: Elimina múltiplos de 2 e 3.

4. **Loop de Verificação para Outros Divisores**:
   - Inicia com `current_divisor = 5`.
   - O loop continua enquanto `current_divisor * current_divisor <= number`.
   - Verifica se `number` é divisível por `current_divisor` ou `current_divisor + 2`.
   - Incrementa `current_divisor` em 6 a cada iteração.

5. **Retorno Final**:
   - Se nenhum divisor for encontrado, retorna `True`.

### Algoritmo Usado

Implementação otimizada do teste de primalidade, pulando múltiplos de 2 e 3 para eficiência.

## Função `main`

```python
def main():
    """
    Função principal para testar a função is_primo com alguns exemplos.
    """
    test_numbers = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20]
    print("Verificação de números primos:")
    for num in test_numbers:
        result = "primo" if is_primo(num) else "não primo"
        print(f"{num}: {result}")
```

- Define uma lista de números para teste.
- Imprime os resultados de forma clara.

## Bloco de Execução

```python
if __name__ == "__main__":
    main()
```

- Executa a função `main` quando o script é rodado diretamente.

### Saída Esperada

```
Verificação de números primos:
1: não primo
2: primo
3: primo
4: não primo
5: primo
16: não primo
17: primo
18: não primo
19: primo
20: não primo
```

## Considerações Finais

- Código segue Clean Code: nomes descritivos, docstrings completas, separação de responsabilidades.
- Eficiente para números pequenos a médios.
- Para grandes números, considere algoritmos avançados.