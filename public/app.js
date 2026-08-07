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
        document.getElementById("addCharOutput").innerHTML = "Error adding character: " + response.statusText;
        return
    } else {
        const data = await response.json()
        document.getElementById("addCharOutput").innerHTML = "Added Character: " + data.name
    }
}

async function addMoves() {
    const token = localStorage.getItem('token')
    const move = document.getElementById('addMoveInput').value

    try {
        const response = await fetch('http://107.23.220.85:3067/api/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ move })
        })
        const data = await response.json();

        if (!response.ok) {
            document.getElementById('addMoveOutput').innerHTML = "Error adding move: " + data.message
            return
        } else {
            document.getElementById('addMoveOutput').innerHTML = move + "successfully added"
        }


    } catch (error) {
        document.getElementById('addMoveOutput').innerHTML = "Server Error: " + error.message
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
        document.getElementById("loginOutput").innerHTML = "Error logging in: " + response.statusText;
        return;
    }
    const data = await response.json();
    document.getElementById("loginOutput").innerHTML = JSON.stringify(data);
    
    localStorage.setItem('token', data.token);
}

async function populateCharacterDropdown() {
    const token = localStorage.getItem('token');
    const dropdown = document.getElementById("getFrameDataInput");

    dropdown.innerHTML = '<option value="">Select a character</option>';
    try {
        const response = await fetch("http://107.23.220.85:3067/api/characters", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()

        if (!response.ok) {
            document.getElementById("frameDataOutput").innerHTML = "Error populating characters: " + data.message
            return;
        }

        for (const char of data) {
            const option = document.createElement("option")

            option.value = char.name;
            option.innerHTML = char.name;
            document.getElementById("getFrameDataInput").appendChild(option)
        }

    } catch (error) {
        document.getElementById("frameDataOutput").innerHTML = "Server Error: " + error.message
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
            document.getElementById("frameDataOutput").innerHTML = "Error getting frame data: " + data.message;
        } else {
            document.getElementById("frameDataOutput").innerHTML = "Frame Data: <br>" + JSON.stringify(data);
        }
    } catch (error) {
        document.getElementById("frameDataOutput").innerHTML = "Server Error: " + error.message;
    }
}


async function addFrameData() {
    const token = localStorage.getItem('token')
    const character = document.getElementById("characterName").value;
    const move = document.getElementById("moveName").value;
    const startup = document.getElementById("startup").value;
    const on_block =  document.getElementById("on_block_advantage").value + document.getElementById("on_block").value;
    const recovery = document.getElementById("recovery").value;
    const notes = document.getElementById("notes").value;

    try {
        const response = await fetch("http://107.23.220.85:3067/api/frame-data", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ character, move, startup, on_block, recovery, notes })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById("addFrameDataOutput").innerHTML = "Error adding frame data: " + data.message;
            return;
        } else {
            document.getElementById("addFrameDataOutput").innerHTML = "Added Frame Data: " + JSON.stringify(data);
        }
    } catch (error) {
        document.getElementById('addFrameDataOutput').innerHTML = "Server Error: " + error.message
    }
}