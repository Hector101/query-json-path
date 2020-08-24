import {
  useRef,
  useEffect,
  ChangeEvent,
  DragEvent,
  MouseEvent,
} from 'react';

type Props = {
  getFile?: (files: FileList) => void;
  accept: string;
};

export default function useDragAndDrop({ getFile, accept }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDocumentDragOver = (event: Event) => {
    event.preventDefault();
  };

  const handleDocumentDrop = (event: Event) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('dragover', handleDocumentDragOver);
    document.addEventListener('drop', handleDocumentDrop);

    return () => {
      document.removeEventListener('dragover', handleDocumentDragOver);
      document.removeEventListener('drop', handleDocumentDrop)
    }
  }, [rootRef]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files) {
      if (getFile) {
        getFile(event.dataTransfer.files)
        event.dataTransfer.clearData()
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {    
    event.preventDefault();
    if (event.target.files) {
      if (getFile) {
        getFile(event.target.files);
      }
    }
  };

  const handleRootClick = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  }

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  }

  const inputProps = {
    type: 'file',
    style: { display: 'none' },
    onChange: handleInputChange,
    onClick: handleInputClick,
    tabIndex: -1,
    ref: inputRef,
    accept,
  };

  const rootProps = {
    onClick: handleRootClick,
    onDrop: handleDrop,
    onDragOver: handleDragOver,
    tabIndex: 0,
    ref: rootRef,
  };
  
  return { rootProps, inputProps };
}
