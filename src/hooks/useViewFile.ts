import {useCallback, useRef, useState} from 'react';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import utils from '~/utils';

/* ------------------------- Helpers ------------------------- */
function getTypeFile(pathFile = ''): string | null {
  const resFile = pathFile.split('.');
  return resFile.length > 0 ? resFile[resFile.length - 1] : null;
}

function fallbackOpenFile(url: string) {
  if (Platform.OS === 'android') {
    RNFetchBlob.android.actionViewIntent(url);
  } else {
    RNFetchBlob.ios.openDocument(url);
  }
}

/* ------------------------- Hook ------------------------- */
const useViewFile = () => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [downloadProgressText, setDownloadProgressText] = useState('');
  const fileRef = useRef<{url: string; name: string}>({
    url: '',
    name: 'Tệp đính kèm',
  });

  const openFile = useCallback(async (filePath: string, fileName: string) => {
    try {
      setIsLoadingFile(true);
      const localPath =
        Platform.OS === 'android' && !filePath.startsWith('file://')
          ? `file://${filePath}`
          : filePath;

      await FileViewer.open(localPath, {
        showOpenWithDialog: true,
        showAppsSuggestions: true,
      });

      utils.log('useViewFile', {filePath});
      setIsLoadingFile(false);
    } catch (error) {
      utils.log('useViewFile', {error});
      setIsLoadingFile(false);
      // fallback mở file nếu FileViewer thất bại
      setTimeout(() => fallbackOpenFile(filePath), 3000);
    }
  }, []);

  const openFileManually = () => {
    const {url, name} = fileRef.current;
    if (url) openFile(url, name);
  };

  const setFile = (url: string, name: string = 'Tệp đính kèm') => {
    fileRef.current = {url, name};
    setTimeout(() => {
      openFile(url, name);
    }, 500);
  };

  return {
    isLoadingFile,
    downloadProgressText,
    setFile,
    openFileManually,
  };
};

export default useViewFile;
