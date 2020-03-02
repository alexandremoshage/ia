# 🤖 Trabalho de IA - Sudoku

### 📝 Instruções

Prazo de entrega: 06/03/2020 até as 18:30

- Relatório:
  - descrevendo o método utilizado e o motivo de tal escolha
  - indicando a linguagem utilizada
  - explicando como utilizar o aplicativo
  - expondo os resultados obtidos. (exemplos de estados iniciais
    apresentadas e soluções obtidas)
- Código fonte e executável

### 📃 Descrição do trabalho

O Projeto consiste em implementar um agente capaz de resolver autonomamente um
desafio de Sudoku. O sistema deve:

- Ler um tabuleiro inicial do jogo sudoku de um arquivo \*.txt (estado inicial). O
  arquivo deve conter 81 dígitos, cada um correspondendo ao valor de uma das
  posições do tabuleiro.
- Resolver o problema através de algum método de IA.
- Exibir a solução encontrada. (Preferencialmente, destacar os valores definidos no
  estado inicial e valores encontrados pelo sistema).

### 🚩 Arquivo do estado inicial

O estado inicial do tabuleiro do jogo sudoku deve ser lido de um arquivo \*.txt.
Como o tabuleiro contém 81 posições, o arquivo deve conter 81 dígitos, cada um
correspondendo ao valor de uma das posições do tabuleiro.
Os valores “0” do arquivo, correspondem às posições vazias no tabuleiro inicial e, portanto,
correspondem às posições cujos valores devem ser encontrados pelo agente.
Os demais valores, entre 1 e 9, serão os valores predefinidos no jogo.
Os 9 primeiros dígitos do arquivo correspondem as 9 posições da primeira linha do tabuleiro.
Os 9 dígitos seguintes, do décimo a décimo oitavo dígito, correspondem as 9 posições da
segunda linha do tabuleiro. E assim, por diante.

Exemplo de estado inicial

```
90000000105120003000098000068074000073000090
8010058670008100000002007090190004060
```

Imagem do estado inicial
![Estado inicial](sudoku.png)

### 📋 Informações adicionais

- O programa pode ser implementado em qualquer linguagem.
- O programa deverá ser executado em Windows (se bibliotecas auxiliares forem
  usadas, todos os arquivos necessários deverão ser incluídos no projeto para que
  ele possa ser executado).

### 💯 Forma de avaliação

O trabalho será avaliado se:

- O trabalho atendeu a todos os requisitos especificados anteriormente;
- Os algoritmos foram implementados e aplicados de forma correta;
- O código foi devidamente organizado;
- O trabalho foi apresentado corretamente;
- O método escolhido é apropriado para o problema
