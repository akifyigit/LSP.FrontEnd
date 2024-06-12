import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { toBase64 } from 'utils/helper';

import Alert from './Alert';
import IconButton from './IconButton';

const Upload = ({
  className = '',
  text = 'Dosya Seçiniz',
  emptyText = 'Dosya Seçilmedi',
  showFilePreview = true,
  showFileName = true,
  showFileSize = true,
  maxSizeLimit = 3,
  accept = '.jpg, .jpeg, .png, .pdf',
  onChange = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [filesBase64, setFilesBase64] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });

  const handleOnChange = async (file) => {
    const validatedFiles = Array.from(file).filter((file) => {
      if (validFileType(file) && file.size <= maxSizeLimit * 1048576) {
        return file;
      } else if (!validFileType(file)) {
        setAlertInfo({
          show: true,
          status: 'warning',
          message: 'Dosya Format Hatası',
        });
      } else if (!file.size <= maxSizeLimit * 1048576) {
        setAlertInfo({
          show: true,
          status: 'warning',
          message: 'Dosya Boyut Hatası',
        });
      }
    });
    updateStateFiles(validatedFiles);

    if (!showFilePreview && !showFileName && !showFileSize)
      setFiles(validatedFiles);
    else setFiles([...files, ...validatedFiles]);
  };

  const updateStateFiles = (vFiles) => {
    vFiles.forEach(async (vFile) => {
      const vFileBase64 = await toBase64(vFile);
      setFilesBase64((prev) => [...prev, vFileBase64]);
    });
  };

  const handleOnCancel = (index) => {
    setFiles(files.filter((file, ix) => index !== ix));
    setFilesBase64(filesBase64.filter((file, ix) => index !== ix));
  };

  useEffect(() => {
    onChange(filesBase64);
  }, [filesBase64]);

  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    `image/x-icon`,
    `application/pdf`,
  ];

  const validFileType = (file) => {
    return fileTypes.includes(file.type);
  };

  const returnFileSize = (number) => {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  };
  return (
    <>
      <div className={`flex items-baseline flex-col ${className}`}>
        <div className="flex">
          <label
            htmlFor="file_upload"
            className="border-default-border border p-3 w-fit cursor-pointer rounded-md hover:bg-sky-lighter"
          >
            {text}
          </label>
          <input
            type="file"
            id="file_upload"
            name="file_upload"
            accept={accept}
            multiple
            onChange={(e) => handleOnChange(e.target.files)}
            className="opacity-0 w-0"
          />
        </div>
        <div
          className={`flex flex-col gap-2 ${
            files.length > 0 &&
            'border-default-border border p-2 w-fit rounded-md'
          }`}
        >
          {files.length > 0 ? (
            !showFilePreview && !showFileName && !showFileSize ? (
              <p>{files.length} Dosya</p>
            ) : (
              files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-2 items-center w-full justify-between"
                  >
                    {showFilePreview && file.type.includes('image') ? (
                      <img className="w-12" src={URL.createObjectURL(file)} />
                    ) : (
                      <div className="w-12 text-center">
                        <i className="fa-solid fa-file fa-4x text-primary"></i>
                      </div>
                    )}
                    {showFileName && <p>{file.name}</p>}
                    {showFileSize && <p>{returnFileSize(file.size)}</p>}
                    <IconButton
                      onClick={() => handleOnCancel(index)}
                      icon={<i className="fa-solid fa-circle-xmark"></i>}
                    />
                  </div>
                );
              })
            )
          ) : (
            <p>{emptyText}</p>
          )}
        </div>
      </div>
      <Alert
        message={alertInfo.message}
        position=""
        status={alertInfo.status}
        showAlert={alertInfo.show}
        duration={3000}
        handleOnClose={() => setAlertInfo({ show: false })}
      />
    </>
  );
};
Upload.propTypes = {
  className: PropTypes.string,
  showFilePreview: PropTypes.bool,
  showFileSize: PropTypes.bool,
  showFileName: PropTypes.bool,
  text: PropTypes.string,
  accept: PropTypes.string,
  emptyText: PropTypes.string,
  onChange: PropTypes.func,
  maxSizeLimit: PropTypes.number,
};
export default Upload;
