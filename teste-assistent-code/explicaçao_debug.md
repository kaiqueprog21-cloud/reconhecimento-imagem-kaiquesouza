Faça commit # Identificação e Correção de Erros no Código Python: debug.py

Este documento identifica os erros presentes no código `debug.py`, explica as causas de cada erro e apresenta as correções aplicadas para tornar o código funcional.

## Código Original com Erros

```python
#                                      CÓDIGO COM ERROS                           
# ENTRADA DE DADOS
cliente = input("Qual é seu nome? ")

qtd1 = int(input("Quantidade do item 1: "))
item1 = float(input(Preço do item 1? ))  # Erro 1

qtd2 = int(input("Quantidade do item 2: "))
item2 = float(input("Preço do item 2? "))

qtd3 = int(input("Quantidade do item 3: "))
item3 = float(input("Preço do item 3? "))

# CÁLCULOS DOS ITENS
total_item1 = qtd1 * item1
total_item2 = qtd2 * item2
total_item3 = qtd3 * item3

subtotal = total_item1 + total_item2 + total_item3
imposto = subtotal * 0.10

# DESCONTO
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
desconto = subtotal * (desconto_cupom / 100)  # Erro 2

# TOTAL FINAL
total = subtotal + imposto - desconto

# EXIBIÇÃO
linha = "=" * 31
separador = "-" * 31

print(linha)
print(f" Cliente: {cliente}")
print(linha)
print(f" Item 1:        R$ {total_item1:.2f}")
print(" Item 2:        R$ {total_item2:.2f}")  # Erro 3
print(f" Item 3:        R$ {total_item3:.2f}")
print(separador)
print(f" Subtotal:      R$ {subtotal:.2f}")
print(f" Imposto (10%): R$ {imposto:.2f}")

if desconto_cupom > 0:  # Erro 4
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")  # Erro 5

print(linha)
print(f" TOTAL:         R$ {round(total, 2):.2f}")
print(linha)
```

## Erros Identificados e Causas

### Erro 1: Sintaxe Inválida na Linha 6
- **Linha**: `item1 = float(input(Preço do item 1? ))`
- **Causa**: Falta de aspas delimitando a string passada para `input()`. Em Python, strings devem ser envolvidas por aspas simples (`'`) ou duplas (`"`). Sem aspas, o interpretador trata `Preço do item 1?` como uma variável indefinida, causando um `NameError`.
- **Sintoma**: `NameError: name 'Preço' is not defined`

### Erro 2: Operação Inválida com Tipos Incompatíveis na Linha 19
- **Linha**: `desconto = subtotal * (desconto_cupom / 100)`
- **Causa**: `desconto_cupom` é uma string (resultado de `input()`), mas está sendo usada em uma operação aritmética (`/ 100`). Python não permite divisão de string por número, resultando em `TypeError`.
- **Sintoma**: `TypeError: unsupported operand type(s) for /: 'str' and 'int'`

### Erro 3: Falta de Interpolação de String na Linha 27
- **Linha**: `print(" Item 2:        R$ {total_item2:.2f}")`
- **Causa**: A string não é uma f-string (não começa com `f`), então `{total_item2:.2f}` é tratado como texto literal, não interpolando o valor da variável.
- **Sintoma**: Imprime literalmente `{total_item2:.2f}` em vez do valor formatado.

### Erro 4: Comparação Inválida de Tipos na Linha 32
- **Linha**: `if desconto_cupom > 0:`
- **Causa**: `desconto_cupom` é uma string, e está sendo comparada com um inteiro (`0`). Python não permite comparação direta entre string e int, causando `TypeError`.
- **Sintoma**: `TypeError: '>' not supported between instances of 'str' and 'int'`

### Erro 5: Indentação Incorreta na Linha 33
- **Linha**: `print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")`
- **Causa**: Falta de indentação dentro do bloco `if`. Em Python, código dentro de estruturas de controle (como `if`) deve ser indentado consistentemente (geralmente 4 espaços).
- **Sintoma**: `IndentationError: expected an indented block`

## Código Corrigido

```python
#                                      CÓDIGO CORRIGIDO                           
# ENTRADA DE DADOS
cliente = input("Qual é seu nome? ")

qtd1 = int(input("Quantidade do item 1: "))
item1 = float(input("Preço do item 1? "))  # Correção: Adicionadas aspas na string

qtd2 = int(input("Quantidade do item 2: "))
item2 = float(input("Preço do item 2? "))

qtd3 = int(input("Quantidade do item 3: "))
item3 = float(input("Preço do item 3? "))

# CÁLCULOS DOS ITENS
total_item1 = qtd1 * item1
total_item2 = qtd2 * item2
total_item3 = qtd3 * item3

subtotal = total_item1 + total_item2 + total_item3
imposto = subtotal * 0.10

# DESCONTO
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))  # Correção: Conversão para float
desconto = subtotal * (desconto_cupom / 100)

# TOTAL FINAL
total = subtotal + imposto - desconto

# EXIBIÇÃO
linha = "=" * 31
separador = "-" * 31

print(linha)
print(f" Cliente: {cliente}")
print(linha)
print(f" Item 1:        R$ {total_item1:.2f}")
print(f" Item 2:        R$ {total_item2:.2f}")  # Correção: Adicionado 'f' para f-string
print(f" Item 3:        R$ {total_item3:.2f}")
print(separador)
print(f" Subtotal:      R$ {subtotal:.2f}")
print(f" Imposto (10%): R$ {imposto:.2f}")

if desconto_cupom > 0:  # Correção: Agora desconto_cupom é float
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")  # Correção: Indentação adicionada

print(linha)
print(f" TOTAL:         R$ {round(total, 2):.2f}")
print(linha)
```

## Resumo das Correções

- **Erro 1**: Adicionadas aspas duplas na string do `input()`.
- **Erro 2**: Convertido `desconto_cupom` para `float` imediatamente após o `input()`.
- **Erro 3**: Transformado em f-string adicionando `f` antes das aspas.
- **Erro 4**: Resolvido automaticamente com a conversão para `float`.
- **Erro 5**: Adicionada indentação de 4 espaços no `print` dentro do `if`.

O código agora é funcional e calcula corretamente o total de uma compra com itens, imposto e desconto opcional.