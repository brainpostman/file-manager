import FolderTreeStore from './store/folder_tree';
import FileMap from './store/file_map';
import '@/features/createFolder';
import '@/features/uploadFile';
import '@/features/deleteFolder';
import '@/features/clearApp';
import { renderChildNodes } from '@/features/renderChildNodes';

FolderTreeStore.initialize();
FileMap.initialize();

renderChildNodes(0);
