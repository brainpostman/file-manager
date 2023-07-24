import { FolderTreeStore } from './store/folder_tree';
import { FileMap } from './store/file_map';
import '@/features/createFolder';
import '@/features/deleteFolder';
import '@/features/clearApp';

FolderTreeStore.initialize();
FileMap.initialize();
