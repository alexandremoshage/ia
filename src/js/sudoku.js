var textoSudoku = "";
var mapaSudoku = [];
var individuos = [];

function lerArquivo(p_arquivo) {
  var file = p_arquivo;
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();
    reader.onload = processarArquivo;
    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
}

function processarArquivo(e) {
  textoSudoku = e.target.result;

  transformaStringEmMatrizSudoku();
  for (var i = 0; i < 100; i++) {
    cromossomo = gerarComossomo();
    var quantidadeErros = contaQuantidadeDeErros(cromossomo);
    individuos[individuos.length] = {};
    individuos[individuos.length - 1].avaliacao = quantidadeErros;
    individuos[individuos.length - 1].cromossomo = cromossomo;
  }

  // oderna os individuos pela avaliação
  individuos.sort(function(a, b) {
    return a.avaliacao - b.avaliacao;
  });

  escreverSudokuTela(individuos[0].cromossomo);
  document.getElementById("erros").innerHTML = individuos[0].avaliacao;
}

function transformaStringEmMatrizSudoku() {
  mapaSudoku[0] = [];
  var linha = 0;
  for (var i = 0; i < textoSudoku.length; i++) {
    mapaSudoku[linha][mapaSudoku[linha].length] = parseInt(textoSudoku[i]);
    if (mapaSudoku[linha].length == 9 && linha < 8) {
      linha = linha + 1;
      mapaSudoku[linha] = [];
    }
  }
}

function gerarNumeroAleatorio(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function contaQuantidadeDeErros(p_sudoku) {
  let erros = 0;
  //conta quantidade de erros na linha
  for (var i = 0; i < p_sudoku.length; i++) {
    erros += contaQuantidadeItensRepetidosArray(p_sudoku[i]);
  }

  //conta quantidade de erros coluna
  for (var i = 0; i <= 8; i++) {
    coluna = [];
    coluna[coluna.length] = p_sudoku[0][i];
    coluna[coluna.length] = p_sudoku[1][i];
    coluna[coluna.length] = p_sudoku[2][i];
    coluna[coluna.length] = p_sudoku[3][i];
    coluna[coluna.length] = p_sudoku[4][i];
    coluna[coluna.length] = p_sudoku[5][i];
    coluna[coluna.length] = p_sudoku[6][i];
    coluna[coluna.length] = p_sudoku[7][i];
    coluna[coluna.length] = p_sudoku[8][i];
    erros += contaQuantidadeItensRepetidosArray(coluna);
  }

  //conta quantidadeErrosQuadrado
  for (var i = 0; i <= 8; i += 3) {
    for (var j = 0; j <= 8; j += 3) {
      let quadrado = [];
      quadrado[quadrado.length] = p_sudoku[i][j];
      quadrado[quadrado.length] = p_sudoku[i][j + 1];
      quadrado[quadrado.length] = p_sudoku[i][j + 2];

      quadrado[quadrado.length] = p_sudoku[i + 1][j];
      quadrado[quadrado.length] = p_sudoku[i + 1][j + 1];
      quadrado[quadrado.length] = p_sudoku[i + 1][j + 2];

      quadrado[quadrado.length] = p_sudoku[i + 2][j];
      quadrado[quadrado.length] = p_sudoku[i + 2][j + 1];
      quadrado[quadrado.length] = p_sudoku[i + 2][j + 2];

      erros += contaQuantidadeItensRepetidosArray(quadrado);
    }
  }
  return erros;
}

function contaQuantidadeItensRepetidosArray(p_linha) {
  let erros = 0;
  for (var i = 1; i <= 9; i++) {
    let quantidadeNumeroRepetidos = p_linha.filter(function(a) {
      return a == i;
    }).length;
    if (quantidadeNumeroRepetidos > 0) {
      erros += quantidadeNumeroRepetidos - 1;
    }
  }

  return erros;
}

function gerarComossomo() {
  var individuo = [];
  individuo = clonar(mapaSudoku);

  for (var i = 0; i < individuo.length; i++) {
    for (var j = 0; j < individuo[i].length; j++) {
      if (individuo[i][j] == 0) {
        individuo[i][j] = gerarNumeroAleatorio(1, 9);
      }
    }
  }

  return individuo;
}

function clonar(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = clonar(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clonar(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

function escreverSudokuTela(p_sudoku) {
  let html = "";
  for (var i = 0; i < p_sudoku.length; i++) {
    html += "<tr>";
    for (var j = 0; j < p_sudoku[i].length; j++) {
      if (mapaSudoku[i][j] == 0) {
        html += '<td class="solucao">';
      } else {
        html += '<td class="original">';
      }
      html += p_sudoku[i][j];
      html += "</ td>";
    }
    html += "</ tr>";
  }
  document.getElementById("sudoku").innerHTML = html;
}
