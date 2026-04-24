# Explicação do Código Python: Verificação de Números Primos

Este documento explica o código presente no arquivo `num_primos.py`, que implementa uma função para verificar se um número é primo usando Python.

## Visão Geral do Código

O código define uma função chamada `is_primo` que recebe um número inteiro e retorna `True` se o número for primo, ou `False` caso contrário. Além disso, há um bloco de teste que verifica alguns números quando o script é executado diretamente.

## Função `is_primo`

```python
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
```

### Explicação Passo a Passo

1. **Definição da Função**:
   - A função `is_primo` recebe um parâmetro `numero` do tipo `int` e retorna um `bool`.
   - A docstring explica que ela retorna `True` para primos e `False` para não primos.

2. **Verificações Iniciais**:
   - `if numero <= 1: return False`: Números menores ou iguais a 1 não são primos.
   - `if numero <= 3: return True`: 2 e 3 são primos (os únicos pares e ímpares pequenos).

3. **Verificação de Divisibilidade por 2 e 3**:
   - `if numero % 2 == 0 or numero % 3 == 0: return False`: Se o número for par (exceto 2) ou divisível por 3, não é primo.

4. **Loop de Verificação para Outros Divisores**:
   - Inicia com `divisor = 5`.
   - O loop continua enquanto `divisor * divisor <= numero` (otimização: não precisa verificar além da raiz quadrada).
   - Verifica se `numero` é divisível por `divisor` ou `divisor + 2` (pulando números pares, já que ímpares).
   - Incrementa `divisor` em 6 a cada iteração (para verificar apenas números da forma 6k ± 1, que são candidatos a primos).

5. **Retorno Final**:
   - Se nenhum divisor for encontrado, retorna `True` (o número é primo).

### Algoritmo Usado

Este é uma implementação otimizada do teste de primalidade básico. Ele evita verificar todos os números até a raiz quadrada, pulando múltiplos de 2 e 3, tornando-o mais eficiente para números maiores.

## Bloco de Teste

```python
if __name__ == "__main__":
    teste_numeros = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20]
    for n in teste_numeros:
        print(f"{n}: {'primo' if is_primo(n) else 'não primo'}")
```

- Este bloco só executa quando o script é rodado diretamente (não quando importado como módulo).
- Define uma lista de números para teste.
- Para cada número, chama `is_primo` e imprime se é primo ou não.

### Saída Esperada

Ao executar o script, você verá algo como:

```
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

- Esta implementação é eficiente para números pequenos a médios.
- Para números muito grandes, algoritmos mais avançados como o teste de Miller-Rabin são recomendados.
- A função usa type hints (`int` e `bool`) para melhor legibilidade e suporte a ferramentas de análise estática.