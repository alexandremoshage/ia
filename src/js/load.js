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
//?puzzle=
function processarArquivo(e) {
  textoSudoku = e.target.result;
  window.location.replace("?puzzle=" + textoSudoku);
}
