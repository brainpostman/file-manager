const clearApp = document.getElementById('clear-app');

if (clearApp) {
    clearApp.onclick = () => {
        window.localStorage.clear();
        location.reload();
    };
}
