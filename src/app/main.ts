import FolderTreeStore from './store/folder_map';
import FileMap from './store/file_map';
import FileDatabase from './store/file_db';
import '@/features/createFolder';
import '@/features/deleteFolder';
import '@/features/clearApp';
import '@/features/deleteFile';
import '@/features/uploadFile';
import '@/features/downloadFile';
import '@/features/updateNodeProps';
import { renderChildNodes } from '@/features/renderChildNodes';

FileDatabase.openDb();
FolderTreeStore.initialize();
FileMap.initialize();

renderChildNodes(0);
