import { setChosenFolder } from '@/entities/node/folder/utils/Folder';
import { NodeTreeStore } from './store/node_tree';
import '@/features/createFolder';

NodeTreeStore.initialize();

const root = document.getElementById('structure-root');

document.addEventListener('click', (event) => {
    const el = event.target as Element;
    if (el.id === 'structure-root') setChosenFolder(root!);
});
