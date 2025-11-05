function expiry(token, expiryTimeInMinutes) {
    const expiryTime = Date.now() + 60 * 1000 * expiryTimeInMinutes;
    localStorage.setItem(`${token}`, expiryTime)
}

function setAuthToken(expiryTimeInMinutes) {
    const token = prompt("Enter your authentication token")
    localStorage.setItem("Authtoken", token)
    expiry(token, expiryTimeInMinutes);
    console.log()
}

function checkTokenValidity(token) {
    const timeLeft = (localStorage.getItem(`${token}`) - Date.now()) / (60 * 1000);
    if (timeLeft > 0) {
        return `Authentication is valid for ${timeLeft}minutes`
    }
    else {
        return `Authentication is now invalid`
    }
}

setAuthToken(0.5)