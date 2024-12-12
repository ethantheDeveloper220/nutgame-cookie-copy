// Define user data object (game state)
let userData = {
    cookies: 0,
    cookiesPerClick: 1,
    upgrades: {
        cursor: 0,
        grandma: 0,
        farm: 0
    }
};

// Update UI with the current game state
function updateUI() {
    document.getElementById("cookieCount").textContent = userData.cookies;
    document.getElementById("cookiesPerClick").textContent = userData.cookiesPerClick;
    document.getElementById("cursorUpgrade").textContent = userData.upgrades.cursor;
    document.getElementById("grandmaUpgrade").textContent = userData.upgrades.grandma;
    document.getElementById("farmUpgrade").textContent = userData.upgrades.farm;
}

// Handle cookie click
document.getElementById("cookieButton").addEventListener("click", function () {
    userData.cookies += userData.cookiesPerClick;
    updateUI();
});

// Handle upgrade purchases
document.getElementById("buyCursor").addEventListener("click", function () {
    if (userData.cookies >= 10) {
        userData.cookies -= 10;
        userData.cookiesPerClick += 1;
        userData.upgrades.cursor += 1;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});

document.getElementById("buyGrandma").addEventListener("click", function () {
    if (userData.cookies >= 50) {
        userData.cookies -= 50;
        userData.cookiesPerClick += 5;
        userData.upgrades.grandma += 1;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});

document.getElementById("buyFarm").addEventListener("click", function () {
    if (userData.cookies >= 200) {
        userData.cookies -= 200;
        userData.cookiesPerClick += 20;
        userData.upgrades.farm += 1;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});

// Save user data to a .txt file
function saveUserData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "user_data.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    console.log("Game saved successfully!");
}

// Load user data from a .txt file
function loadUserData(callback) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    input.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const data = JSON.parse(e.target.result);
                    console.log("Game loaded successfully!", data);
                    callback(data);
                } catch (error) {
                    console.error("Error loading game data:", error);
                    alert("Invalid file format. Please select a valid save file.");
                }
            };
            reader.readAsText(file);
        } else {
            console.log("No file selected.");
        }
    });
    input.click();
}

// Save and Load button logic
document.getElementById("saveButton").addEventListener("click", function () {
    saveUserData(userData);
});

document.getElementById("loadButton").addEventListener("click", function () {
    loadUserData(function (loadedData) {
        userData = loadedData; // Update game state with loaded data
        updateUI(); // Refresh the UI
    });
});

// Initialize the game state on page load
updateUI();