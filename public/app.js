function myFunction() {
    document.getElementById("text").innerHTML = "Hello World!";
}

async function fetchData() {
    const response = await fetch(EC2_HOST + '/api/characters');
    if (!response.ok) {
        document.getElementById("characters").innerHTML = "Error fetching data: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("characters").innerHTML = JSON.stringify(data);
    }
}