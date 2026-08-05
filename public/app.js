function myFunction() {
    document.getElementById("text").innerHTML = "Hello World!";
}

async function fetchCharacters() {
    const token = localStorage.getItem('token');

    const response = await fetch('http://107.23.220.85:3067/api/characters', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        document.getElementById("characters").innerHTML = "Error fetching data: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("addCharacters").innerHTML = "Characters: <br>";
        for (let i = 0; i < data.length; i++) {
            

        }
    }
}

async function addCharacters() {
    const name = document.getElementById("addChar").value
    const token = localStorage.getItem('token')
    const response = await fetch("http://107.23.220.85:3067/api/characters", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    })
    if (!response.ok) {
        document.getElementById("addCharForm").innerHTML = "Error: " + response.statusText;
        return
    } else {
        const data = await response.json()
        document.getElementById("addCharForm").innerHTML = "Added Character: " + data.name
    }
}

async function registerUser() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    const response = await fetch('http://107.23.220.85:3067/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password}),
    });
    if (!response.ok) {
        document.getElementById("register").innerHTML = "Error registering user: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("register").innerHTML = JSON.stringify(data);
    }
}

async function loginUser() {
    const username = document.getElementById("logUsername").value;
    const password = document.getElementById("logPassword").value;

    const response = await fetch('http://107.23.220.85:3067/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        document.getElementById("login").innerHTML = "ERROR logging in user: " + response.statusText;
        return;
    }
    const data = await response.json();
    document.getElementById("login").innerHTML = JSON.stringify(data);
    
    localStorage.setItem('token', data.token);
}