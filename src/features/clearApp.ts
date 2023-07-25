import FileDatabase from '@/app/store/file_db';

const clearApp = document.getElementById('clear-app');

if (clearApp) {
    clearApp.onclick = () => {
        window.localStorage.clear();
        FileDatabase.deleteDatabase();
        location.reload();
    };
}
