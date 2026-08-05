function myFunction() {
    document.getElementById("text").innerHTML = "Hello World!";
}

async function fetchCharacters() {
    const token = localStorage.getItem('token');

    const response = await fetch('http://107.23.220.85:3067/api/characters', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        document.getElementById("charactersOutput").innerHTML = "Error fetching data: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("charactersOutput").innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            document.getElementById("charactersOutput").innerHTML += data[i].name + "<br>";
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
        document.getElementById("addCharOutput").innerHTML = "Error: " + response.statusText;
        return
    } else {
        const data = await response.json()
        document.getElementById("addCharOutput").innerHTML = "Added Character: " + data.name
    }
}

async function getFrameData () {
    const name = document.getElementById("getFrameDataInput").value
    const token = localStorage.getItem("token")

    try {
        const response = await fetch(`http://107.23.220.85:3067/api/frame-data/${name}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();

        if (!response.ok) {
            document.getElementById("frameDataOutput").innerHTML = "Error: " + data.message;
        } else {
            document.getElementById("frameDataOutput").innerHTML = "Frame Data: <br>" + JSON.stringify(data);
        }
    } catch (error) {
        document.getElementById("frameDataOutput").innerHTML = "Error: " + error.message;
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
        document.getElementById("registerOutput").innerHTML = "Error registering user: " + response.statusText;
        return;
    } else {
        const data = await response.json();
        document.getElementById("registerOutput").innerHTML = JSON.stringify(data);
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
        document.getElementById("loginOutput").innerHTML = "ERROR logging in user: " + response.statusText;
        return;
    }
    const data = await response.json();
    document.getElementById("loginOutput").innerHTML = JSON.stringify(data);
    
    localStorage.setItem('token', data.token);
}

async function populateCharacterDropdown() {
    const token = localStorage.getItem('token');
    const dropdown = document.getElementById("getFrameDataInput");
    try {
        const response = await fetch("http://107.23.220.85:3067/api/characters", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()

        if (!response.ok) {
            document.getElementById("frameDataOutput").innerHTML = data.message
            return;
        }

        for (const char of data) {
            const option = document.createElement("option")

            option.value = char.name;
            option.innerHTML = char.name;
            document.getElementById("getFrameDataInput").appendChild(option)
        }

    } catch (error) {
        document.getElementById("frameDataOutput").innerHTML = "Error: " + error.message
    }

}