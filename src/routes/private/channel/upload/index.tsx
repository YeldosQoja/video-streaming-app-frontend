import "./styles.css";
import React, { useRef, useState } from "react";
import { Dialog } from "radix-ui";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components";

const Upload = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleUploadFile = () => {
    console.log("handleUploadFile");
    setUploadDialogOpen(true);
  };

  const pickVideoFromComputer: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleSelectVideo = () => {
    videoInputRef.current?.click();
  };

  return (
    <Dialog.Root
      open={uploadDialogOpen}
      onOpenChange={setUploadDialogOpen}>
      <Dialog.Trigger asChild>
        <Button
          title="Upload File"
          className="upload-btn"
          onClick={handleUploadFile}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="upload-overlay" />
        <Dialog.Content className="upload-content">
          <Dialog.Title>Upload Video</Dialog.Title>
          <Dialog.Description>
            Press Select Video button or drag and drop video from computer
          </Dialog.Description>
          <div className="upload-dropzone">
            <button
              onClick={handleSelectVideo}
              className="upload-icon-btn">
              <UploadIcon
                size={36}
                className="upload-icon"
              />
            </button>
            <p className="upload-text-primary">Select video to upload</p>
            <p className="upload-text-secondary">
              Or drag and drop video files
            </p>
            <input
              ref={videoInputRef}
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={pickVideoFromComputer}
            />
            <Button
              title="Select video"
              className="select-video-btn"
              onClick={handleSelectVideo}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Upload;
