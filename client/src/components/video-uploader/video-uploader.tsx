import { useState } from 'react';
import { toast } from 'react-toastify';

type VideoUploaderProps = {
  label?: string,
  onVideoUpload?: Function
}

export default function VideoUploader({ label, onVideoUpload }: VideoUploaderProps) {
  const allowedVideoExtensions = ['mov', 'avi', 'mp4'];
  const placeholderText = label ?? `Загрузите сюда файлы формата ${allowedVideoExtensions.map((ext) => ext.toUpperCase()).join(', ')}`
  const [placeholder, setPlaceholder] = useState(placeholderText);

  function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (!target.files) {
      return;
    }

    const uploadingVideo = target.files[0];
    const fileExtension = uploadingVideo.type.split('/')[1];

    if(!allowedVideoExtensions.includes(fileExtension)) {
      toast.warn(`Uploading video extension is not supported (${fileExtension}); Allowed extensions: ${allowedVideoExtensions.join(', ')}`);
      return;
    }

    setPlaceholder(uploadingVideo.name);

    if(!onVideoUpload) {
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadingVideo);

    if (onVideoUpload) {
      onVideoUpload(formData)
    }
  }

  return (
    <div className="drag-and-drop create-training__drag-and-drop">
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>
          {placeholder}
          <svg width={20} height={20} aria-hidden="true">
            <use xlinkHref="#icon-import-video" />
          </svg>
        </span>
        <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" onChange={handleVideoUpload} />
      </label>
    </div>
  )
}
