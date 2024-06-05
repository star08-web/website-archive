function checkCookie(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
            return true;
        }
    }
    return false;
}

function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function setStyleTag(cssCode, id="") {
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(cssCode));
    document.head.appendChild(styleTag);
    styleTag.id = id
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 1 Jan 0000 00:00:00 UTC; path=/;";
}

function replaceURL(uri){
    window.location.href = uri
}

function copyToClipboard(content, type="link") {
    var tempInput = document.createElement("input");
    tempInput.value = content;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    spawnnotify(`${type} copiato negli appunti`, 'success')
}

function calcAge(birth) {
    try {
        var today = new Date();
        var birthDate = new Date(birth.replace(/-/g, '/')); // now should work in safari/webkit/call it whatever you want, thanks apple for feeling special about date formats
        var years = today.getFullYear() - birthDate.getFullYear();

        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            years--;
        }
        if (isNaN(years) || years <= 0) {
            spawnnotify('Errore durante il calcolo dell\'età, le informazioni potrebbero essere non aggiornate', 'error');
            return 15;
        }
        return years;
    } catch (error) {
        spawnnotify(`Errore durante il calcolo dell'età ${error}`, 'error');
        return 15;
    }
}

// Preload Images Self Invoking Function
document.addEventListener('DOMContentLoaded', function() {
    let images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        const preload = new Image();
        preload.src = images[i].src;
    }
});