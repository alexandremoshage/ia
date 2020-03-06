var textoSudoku = "";
var mapaSudoku = [];
var individuos = [];
var numerosPossiveis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
  for (var i = 0; i < 200; i++) {
    let cromossomo = gerarComossomo();
    var quantidadeErros = contaQuantidadeDeErros(cromossomo);
    individuos[individuos.length] = {};
    individuos[individuos.length - 1].avaliacao = quantidadeErros;
    individuos[individuos.length - 1].cromossomo = cromossomo;
  }

  // oderna os individuos pela avaliação
  individuos.sort(function(a, b) {
    return a.avaliacao - b.avaliacao;
  });

  setInterval(function() {
    escreverSudokuTela(individuos[0].cromossomo);
    document.getElementById("erros").innerHTML = individuos[0].avaliacao; // + 'Melhor ' + individuos[0].avaliacao
  }, 500);

  setInterval(function() {
    individuos.sort(function(a, b) {
      return a.avaliacao - b.avaliacao;
    });

    individuos = individuos.slice(0, 20);

    let cromossomo;
    for (var i = 0; i < 200; i++) {
      if (individuos.length > 50) {
        cromossomo = gerarNovasGeracoes(individuos.slice(0, 50));
      } else {
        cromossomo = gerarNovasGeracoes(individuos.slice(0, individuos.length));
        individuos.sort(function(a, b) {
          return a.avaliacao - b.avaliacao;
        });
      }

      var quantidadeErros = contaQuantidadeDeErros(cromossomo);
      //if (verificaJaExisteIndividuo(cromossomo) == false) {
      //    individuos[individuos.length] = {};
      //    individuos[individuos.length - 1].avaliacao = quantidadeErros;
      //    individuos[individuos.length - 1].cromossomo = cromossomo;
      //}
      individuos[individuos.length] = {};
      individuos[individuos.length - 1].avaliacao = quantidadeErros;
      individuos[individuos.length - 1].cromossomo = cromossomo;
    }

    individuos.sort(function(a, b) {
      return a.avaliacao - b.avaliacao;
    });
  }, 0);
}

function verificaJaExisteIndividuo(p_cromosso) {
  individuos.filter(function(a) {
    return arraysEqual(a.cromossomo, p_cromosso);
  }).length > 0;
}

function arraysEqual(a1, a2) {
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function gerarNovasGeracoes(p_selecionados) {
  var individuo;
  individuo = clonar(
    p_selecionados[gerarNumeroAleatorio(0, p_selecionados.length - 1)]
      .cromossomo
  );
  var individuo2 = clonar(
    p_selecionados[gerarNumeroAleatorio(0, p_selecionados.length - 1)]
      .cromossomo
  );
  //cross over
  //for (var i = 0; i < individuo.length; i++) {
  //    for (var j = 0; j < individuo[i].length; j++) {
  //        if (gerarNumeroAleatorio(0, 2) == 1) {
  //            if (mapaSudoku[i][j] == 0) {
  //                individuo[i][j] = clonar(individuo2[i][j]);
  //            }
  //        }
  //    }
  //}

  // realiza mutação
  mutacao = 3;
  for (var i = 0; i < mutacao; i++) {
    let isMutou = false;
    while (isMutou == false) {
      let linha1 = gerarNumeroAleatorio(0, 9);
      let coluna1 = gerarNumeroAleatorio(0, 9);

      let linha2 = gerarNumeroAleatorio(0, 9);
      let coluna2 = gerarNumeroAleatorio(0, 9);

      if (
        mapaSudoku[linha1][coluna1] == 0 &&
        mapaSudoku[linha2][coluna2] == 0
      ) {
        let aux = clonar(individuo[linha2][coluna2]);
        individuo[linha2][coluna2] = clonar(individuo[linha1][coluna1]);
        individuo[linha1][coluna1] = clonar(aux);
        isMutou = true;
      }
    }
  }
  return individuo;
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
    let coluna = [];
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
  var individuo;
  individuo = clonar(mapaSudoku);

  for (var i = 0; i < individuo.length; i++) {
    for (var j = 0; j < individuo[i].length; j++) {
      if (individuo[i][j] == 0) {
        individuo[i][j] = gerarNumeroDisponivelLinha(individuo[i]);
      }
    }
  }
  return individuo;
}

function gerarNumeroDisponivelLinha(p_linha) {
  let numerosDisponiveis = numerosPossiveis.filter(function(x) {
    return !p_linha.includes(x);
  });
  return numerosDisponiveis[gerarNumeroAleatorio(0, numerosDisponiveis.length)];
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
  let html = '<table class="table">\n';
  for (var i = 0; i < 9; i++) {
    html += "<tr>";
    for (var j = 0; j < 9; j++) {
      var c = "cell";
      if ((i + 1) % 3 == 0 && j % 3 == 0) {
        c = "cell3";
      } else if ((i + 1) % 3 == 0) {
        c = "cell1";
      } else if (j % 3 == 0) {
        c = "cell2";
      }
      if (mapaSudoku[i][j] == 0) {
        html += '<td class="solucao ' + c + '">';
      } else {
        html += '<td class="original ' + c + '">';
      }

      html += "<span>" + p_sudoku[i][j] + "</span>";
      html += "</ td>";
    }
    html += "</ tr>";
    html += "</table>";
  }
  document.getElementById("sudoku").innerHTML = html;
}
