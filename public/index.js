const counterText = document.getElementById("counter");

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
