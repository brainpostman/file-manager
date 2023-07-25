import FolderTreeStore from './store/folder_map';
import FileMap from './store/file_map';
import FileDatabase from './store/file_db';
import '@/features/createFolder';
import '@/features/uploadFile';
import '@/features/deleteFolder';
import '@/features/clearApp';
import { renderChildNodes } from '@/features/renderChildNodes';

FileDatabase.openDb();
FolderTreeStore.initialize();
FileMap.initialize();

renderChildNodes(0);
