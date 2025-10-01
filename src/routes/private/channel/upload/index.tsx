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
              <div className="upload-dropzone upload-dropzone__video">
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
                  className="select-file-btn"
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
                  <form
                    id="upload-form"
                    className="upload-form">
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
                        className="textarea__desc"
                        placeholder="Tell viewers about your video"
                      />
                    </div>
                    <div className="flex-row">
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
                  <p className="upload-text-secondary">
                    Upload a custom thumbnail that represents your video
                  </p>
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
                        form="upload-form"
                        onChange={pickThumbnailFromComputer}
                      />
                      <Button
                        className="select-file-btn"
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
                  <div className="upload-privacy-field">
                    <Label htmlFor="privacy">Privacy</Label>
                    <Select
                      options={[
                        {
                          label: "Public - Anyone can watch",
                          value: "public",
                          icon: <Globe size={18} />,
                        },
                        {
                          label: "Unlisted - Only people with link",
                          value: "unlisted",
                          icon: <EyeOff size={18} />,
                        },
                        {
                          label: "Private - Only you can watch",
                          value: "private",
                          icon: <Lock size={18} />,
                        },
                      ]}
                      selectedValue={selectedPrivacy}
                      onValueChange={setSelectedPrivacy}
                    />
                  </div>
                  <fieldset
                    className="interaction-settings__fieldset"
                    form="upload-form">
                    <legend>Interaction Settings</legend>
                    <div className="upload-checkbox-field">
                      <Checkbox.Root
                        className="upload-checkbox-root"
                        form="upload-form"
                        id="allow-comments">
                        <Checkbox.Indicator asChild>
                          <Check
                            size={18}
                            className="checkbox-indicator-icon"
                          />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="allow-comments">Allow comments</label>
                    </div>
                    <div className="upload-checkbox-field">
                      <Checkbox.Root
                        className="upload-checkbox-root"
                        form="upload-form"
                        id="allow-downloads">
                        <Checkbox.Indicator asChild>
                          <Check
                            size={18}
                            className="checkbox-indicator-icon"
                          />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="allow-downloads">Allow downloads</label>
                    </div>
                  </fieldset>
                </Tabs.Content>
              </Tabs.Root>
              <Button
                title="Upload"
                className="upload-btn"
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Upload;
