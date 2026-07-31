function myFunction() {
    document.getElementById("text").innerHTML = "Hello World!";
}

async function fetchData() {
    const response = await fetch('http://107.23.220.85:3067/api/auth/register');
    if (!response.ok) {
        document.getElementById("characters").innerHTML = "Error fetching data: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("characters").innerHTML = JSON.stringify(data);
    }
}

async function registerUser() {
    const username = document.getElementById("regUsername").innerHTML.value;
    const password = document.getElementById("regPassword").innerHTML.value;

    const response = await fetch('http://107.23.220.85:3067/api/characters');
    if (!response.ok) {
        document.getElementById("register").innerHTML = "Error registering user: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("register").innerHTML = JSON.stringify(data);
    }
}

async function loginUser() {
    const username = document.getElementById("logUsername").innerHTML.value;
    const password = document.getElementById("logPassword").innerHTML.value;

    const response = await fetch('http://107.23.220.85:3067/api/auth/login');
    if (!response.ok) {
        document.getElementById("login").innerHTML = "ERROR loggin in user: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("login").innerHTML = JSON.stringify(data);
    }
}