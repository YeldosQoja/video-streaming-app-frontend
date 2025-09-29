import "./styles.css";
import React, { useRef, useState } from "react";
import { Checkbox, Dialog, Tabs } from "radix-ui";
import { Check, EyeOff, Globe, Image, Lock, UploadIcon } from "lucide-react";
import { Button, Input, Label, Select } from "@/components";
import { SelectedFileCard } from "@/components/selected-file-card";

const categories = [
  { id: 1, label: "Entertainment" },
  { id: 2, label: "Education" },
  { id: 3, label: "Music" },
  { id: 4, label: "Sports" },
  { id: 5, label: "Gaming" },
  { id: 6, label: "News" },
  { id: 7, label: "Science & Technology" },
  { id: 8, label: "Travel" },
  { id: 9, label: "Howto & Style" },
  { id: 10, label: "Comedy" },
  { id: 11, label: "Film & Animation" },
  { id: 12, label: "People & Blogs" },
  { id: 13, label: "Pets & Animals" },
  { id: 14, label: "Autos & Vehicles" },
  { id: 15, label: "Nonprofits & Activism" },
];

const Upload = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("5");

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedPrivacy, setSelectedPrivacy] = useState<string>("public");

  const handleUploadFile = () => {
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

  const removeSelectedVideo = () => {
    setSelectedVideo(null);
    setSelectedThumbnail(null);
  };

  const pickThumbnailFromComputer: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
    }
  };

  const handleSelectThumbnail = () => {
    thumbnailInputRef.current?.click();
  };

  const removeThumbnail = () => {
    setSelectedThumbnail(null);
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
          {selectedVideo === null ? (
            <>
              <Dialog.Title>Upload Video</Dialog.Title>
              <div className="upload-dropzone upload-dropzone--video">
                <button
                  onClick={handleSelectVideo}
                  className="upload-icon-btn">
                  <UploadIcon
                    size={48}
                    className="upload-icon"
                  />
                </button>
                <p>Select video to upload</p>
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
            </>
          ) : (
            <>
              <Tabs.Root defaultValue="details">
                <Tabs.List className="tabs-list">
                  <Tabs.Trigger
                    value="details"
                    className="tab-trigger">
                    Details
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="thumbnail"
                    className="tab-trigger">
                    Thumbnail
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="settings"
                    className="tab-trigger">
                    Settings
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="details">
                  <form className="upload-form">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        defaultValue={selectedVideo.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        name="description"
                        maxLength={5000}
                        className="desc-textarea"
                        placeholder="Tell viewers about your video"
                      />
                    </div>
                    <div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          options={categories.map((c) => ({
                            ...c,
                            value: c.id.toString(),
                          }))}
                          selectedValue={selectedCategory}
                          onValueChange={setSelectedCategory}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          name="tags"
                          type="text"
                          placeholder="Add tags separated by commas"
                        />
                      </div>
                    </div>
                  </form>
                </Tabs.Content>
                <Tabs.Content value="thumbnail">
                  <h3>Upload a thumbnail</h3>
                  <div className="upload-text-secondary">
                    Upload a custom thumbnail that represents your video
                  </div>
                  {!selectedThumbnail ? (
                    <div className="upload-dropzone">
                      <button
                        onClick={handleSelectThumbnail}
                        className="upload-icon-btn">
                        <Image size={42} />
                      </button>
                      <input
                        ref={thumbnailInputRef}
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={pickThumbnailFromComputer}
                      />
                      <Button
                        className="select-video-btn"
                        title="Select thumbnail"
                        onClick={handleSelectThumbnail}
                      />
                    </div>
                  ) : (
                    <SelectedFileCard
                      filename={selectedThumbnail.name}
                      size={selectedThumbnail.size}
                      renderIcon={() => <Image className="file-card__icon" />}
                      style="outlined"
                      iconContainerStyle="gray"
                      onRemove={removeThumbnail}
                    />
                  )}
                </Tabs.Content>
                <Tabs.Content value="settings">
                  <form className="upload-settings-form">
                    <div className="upload-form-field">
                      <Label htmlFor="privacy">Privacy</Label>
                      <Select
                        options={[
                          {
                            label: "Public - Anyone can watch",
                            value: "public",
                          },
                          {
                            label: "Unlisted - Only people with link",
                            value: "unlisted",
                          },
                          {
                            label: "Private - Only you can watch",
                            value: "private",
                          },
                        ]}
                        selectedValue={selectedPrivacy}
                        onValueChange={setSelectedPrivacy}
                        renderItem={(o) => (
                          <>
                            <div className="upload-privacy-option">
                              <Check
                                size={18}
                                className="upload-privacy-icon"
                                color={
                                  o.value !== selectedPrivacy
                                    ? "transparent"
                                    : "#111827"
                                }
                              />
                            </div>
                            <div className="upload-privacy-option">
                              {o.value === "public" ? (
                                <Globe
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : o.value === "unlisted" ? (
                                <EyeOff
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : o.value === "private" ? (
                                <Lock
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : null}
                            </div>
                            <span className="upload-privacy-text">
                              {o.label}
                            </span>
                          </>
                        )}
                      />
                    </div>
                    <fieldset className="upload-fieldset">
                      <legend className="upload-legend">
                        Interaction Settings
                      </legend>
                      <div className="upload-checkbox-field">
                        <Checkbox.Root
                          className="upload-checkbox-root"
                          id="comments">
                          <Checkbox.Indicator className="upload-checkbox-indicator">
                            <Check size={18} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          className="upload-checkbox-label"
                          htmlFor="comments">
                          Allow comments
                        </label>
                      </div>
                      <div className="upload-checkbox-field">
                        <Checkbox.Root
                          className="upload-checkbox-root"
                          id="downloads">
                          <Checkbox.Indicator className="upload-checkbox-indicator">
                            <Check size={18} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label
                          className="upload-checkbox-label"
                          htmlFor="downloads">
                          Allow downloads
                        </label>
                      </div>
                    </fieldset>
                  </form>
                </Tabs.Content>
              </Tabs.Root>
              <Button title="Upload" />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Upload;
