const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const counterText = document.getElementById("counter");

increaseButton.onclick = function() {
    performRequest("/counter_increase", displayNewCounterValue);
};

decreaseButton.onclick = function() {
    performRequest("/counter_decrease", displayNewCounterValue);
};

setInterval(function() {
    performRequest("/get_counter", displayNewCounterValue);
}, 1000 * 10);

performRequest("/get_counter", displayNewCounterValue);

function displayNewCounterValue() {
    counterText.innerHTML = this.responseText;
}

function performRequest(url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = callback;
    xhttp.open("POST", url, true);
    xhttp.send();
}
