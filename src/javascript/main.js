//document.querySelector("#inputfield").addEventListener("input", getData);
document.querySelector("#letsgo").addEventListener("click", getData);


var data = {};
var ngramSize = 4;
var markovSize = 500;

function getData() {
    data = {};
    var inputText = document.querySelector("#inputfield").value.toLowerCase();

    for (var i = 0; i < inputText.length - 1; i++) {
        var ngram = inputText.substr(i, ngramSize);
        var nextLetter = inputText.substr(i + ngramSize, 1);

        if (!data[ngram]) {
            data[ngram] = [nextLetter];
        } else {
            data[ngram].push(nextLetter);
        }
    }

    createMarkov();
}

function createMarkov() {
    var text = document.querySelector("#inputfield").value.toLowerCase();
    var start = Math.floor(Math.random() * text.length);
    var currentGram = text.substr(start, ngramSize);
    var fullMarkov = currentGram;

    for (var i = 0; i < markovSize; i++) {
        if (data[currentGram]) {
            var rand = Math.floor(Math.random() * (data[currentGram].length - 1));
            var nextLetter = data[currentGram][rand];

            currentGram = currentGram.substr(1, ngramSize) + nextLetter;

            fullMarkov += nextLetter;
        }
    }

    document.querySelector("#markov").innerHTML = fullMarkov + "<br>";
}
