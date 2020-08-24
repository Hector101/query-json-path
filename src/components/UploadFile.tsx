import React from 'react';

import { useDragAndDrop } from '../hooks';
import { useStore } from '../store';

import { ReactComponent as Upload } from '../svgs/upload.svg';

import '../styles/UploadFile.css';

const UploadFile = () => {
  const { treeStore } = useStore();

  const _getFile = (files: FileList) => {
    treeStore.loadTree(files[0]);
  };

  const {
    inputProps,
    rootProps,
  } = useDragAndDrop({
    getFile: _getFile,
    accept: 'application/json',
  });

  return (
    <>
      <div
        {...rootProps}
        className="root-drag-n-drop"
        >
        <input {...inputProps} />
        <Upload className="upload-icon" />
        <h1 className="drag-n-drop-title">Drag and Drop</h1>
        <span>OR</span>
        <h1 className="drag-n-drop-title">Click here</h1>
      </div>
      <h4 className="upload-title">Upload a JSON file for visualization</h4>
    </>
  );
}

export default UploadFile;
