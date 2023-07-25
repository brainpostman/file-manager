import FileDatabase from '@/app/store/file_db';

const clearAppBtn = document.getElementById('clear-app');

if (clearAppBtn) {
    clearAppBtn.onclick = () => {
        window.localStorage.clear();
        FileDatabase.deleteDatabase();
        location.reload();
    };
}
