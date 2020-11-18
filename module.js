function getCsvData(dataPath) {
  const request = new XMLHttpRequest();
  request.addEventListener("load", (event) => {
    const response = event.target.responseText;
    outputElement.innerHTML = response;
    // console.log(outputElement);
  });
  request.open("GET", dataPath, true);
  request.send();
}

function processData(path) {
  getCsvData(path);
}

export { processData };
