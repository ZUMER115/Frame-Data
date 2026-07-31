function myFunction() {
    document.getElementById("text").innerHTML = "Hello World!";
}

async function fetchData() {
    const response = await fetch(EC2_HOST + '/api/characters');
    const data = await response.json();
    document.getElementById("characters").innerHTML = JSON.stringify(data);
}