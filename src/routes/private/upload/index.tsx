import "./styles.css";
import type React from "react";
import {
  Check,
  EyeOff,
  Globe,
  Image,
  Upload as IUpload,
  Lock,
  Video,
} from "lucide-react";
import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import { Form, FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import { Select } from "@/components";
import * as Checkbox from "@radix-ui/react-checkbox";
import { SelectItemText } from "@radix-ui/react-select";
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

export default function Upload() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("5");

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedPrivacyKey, setSelectedPrivacyKey] =
    useState<string>("public");

  const handleSelectVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const triggerVideoSelection = () => {
    videoInputRef.current?.click();
  };

  const removeSelectedVideo = () => {
    setSelectedVideo(null);
    setSelectedThumbnail(null);
  };

  const handleSelectThumbnail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
    }
  };

  const triggerThumbnailSelection = () => {
    thumbnailInputRef.current?.click();
  };

  const removeThumbnail = () => {
    setSelectedThumbnail(null);
  };

  return (
    <div className="upload">
      <div className="upload-card">
        <div>
          <div className="upload-header">
            <Video
              size={28}
              className="upload-header-icon"
            />
            <h4 className="upload-title">
              {selectedVideo ? "Selected Video" : "Video File"}
            </h4>
          </div>
          {selectedVideo ? (
            <SelectedFileCard
              filename={selectedVideo.name}
              size={selectedVideo.size}
              renderIcon={() => (
                <Video
                  size={24}
                  className="file-card__icon"
                />
              )}
              onRemove={removeSelectedVideo}
            />
          ) : null}
        </div>
        {selectedVideo ? <Separator className="separator" /> : null}
        {selectedVideo ? (
          <div className="upload-content">
            <Tabs defaultValue="details">
              <TabsList className="upload-tabs-list">
                <TabsTrigger
                  value="details"
                  className="upload-tab-trigger">
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="thumbnail"
                  className="upload-tab-trigger">
                  Thumbnail
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="upload-tab-trigger">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <Form className="upload-form">
                  <FormField
                    name="title"
                    className="upload-form-field">
                    <FormLabel className="upload-form-label">Title</FormLabel>
                    <FormControl
                      type="text"
                      className="upload-form-input"
                      defaultValue={selectedVideo.name}
                    />
                  </FormField>
                  <FormField
                    name="description"
                    className="upload-form-field">
                    <FormLabel className="upload-form-label">
                      Description
                    </FormLabel>
                    <FormControl asChild>
                      <textarea
                        maxLength={5000}
                        className="upload-form-textarea"
                        placeholder="Tell viewers about your video"
                      />
                    </FormControl>
                  </FormField>
                  <div className="upload-form-row">
                    <FormField
                      name="category"
                      className="upload-form-field-flex">
                      <FormLabel className="upload-form-label">
                        Category
                      </FormLabel>
                      <FormControl asChild>
                        <Select
                          options={categories.map((c) => ({
                            ...c,
                            key: c.id.toString(),
                          }))}
                          selectedKey={selectedCategoryKey}
                          onChange={setSelectedCategoryKey}
                        />
                      </FormControl>
                    </FormField>
                    <FormField
                      name="tags"
                      className="upload-form-field-flex">
                      <FormLabel className="upload-form-label">Tags</FormLabel>
                      <FormControl asChild>
                        <input
                          type="text"
                          className="upload-form-input"
                          placeholder="Add tags separated by commas"
                        />
                      </FormControl>
                    </FormField>
                  </div>
                </Form>
              </TabsContent>
              <TabsContent
                value="thumbnail"
                className="upload-thumbnail-content">
                <div>
                  <div className="upload-thumbnail-header">
                    Upload a thumbnail
                  </div>
                  <div className="upload-thumbnail-description">
                    Upload a custom thumbnail that represents your video
                  </div>
                </div>
                {!selectedThumbnail ? (
                  <div className="upload-thumbnail-dropzone">
                    <div
                      onClick={triggerThumbnailSelection}
                      className="upload-thumbnail-icon">
                      <Image
                        size={42}
                        className="upload-icon"
                      />
                    </div>
                    <input
                      ref={thumbnailInputRef}
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      className="upload-hidden"
                      onChange={handleSelectThumbnail}
                    />
                    <button
                      className="upload-button"
                      onClick={triggerThumbnailSelection}>
                      Upload thumbnail
                    </button>
                  </div>
                ) : (
                  <SelectedFileCard
                    filename={selectedThumbnail.name}
                    size={selectedThumbnail.size}
                    renderIcon={() => (
                      <Image className="file-card__icon" />
                    )}
                    style="outlined"
                    iconContainerStyle="gray"
                    onRemove={removeThumbnail}
                  />
                )}
              </TabsContent>
              <TabsContent value="settings">
                <Form className="upload-settings-form">
                  <FormField
                    name="privacy"
                    className="upload-form-field">
                    <FormLabel className="upload-form-label">Privacy</FormLabel>
                    <FormControl asChild>
                      <Select
                        options={[
                          {
                            label: "Public - Anyone can watch",
                            key: "public",
                          },
                          {
                            label: "Unlisted - Only people with link",
                            key: "unlisted",
                          },
                          {
                            label: "Private - Only you can watch",
                            key: "private",
                          },
                        ]}
                        selectedKey={selectedPrivacyKey}
                        onChange={setSelectedPrivacyKey}
                        renderItem={(o) => (
                          <>
                            <div className="upload-privacy-option">
                              <Check
                                size={18}
                                className="upload-privacy-icon"
                                color={
                                  o.key !== selectedPrivacyKey
                                    ? "transparent"
                                    : undefined
                                }
                              />
                            </div>
                            <div className="upload-privacy-option">
                              {o.key === "public" ? (
                                <Globe
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : o.key === "unlisted" ? (
                                <EyeOff
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : o.key === "private" ? (
                                <Lock
                                  size={18}
                                  className="upload-privacy-icon"
                                />
                              ) : null}
                            </div>
                            <SelectItemText className="upload-privacy-text">
                              {o.label}
                            </SelectItemText>
                          </>
                        )}
                      />
                    </FormControl>
                  </FormField>
                  <fieldset className="upload-fieldset">
                    <legend className="upload-legend">
                      Interaction Settings
                    </legend>
                    <FormField
                      name="comments"
                      className="upload-checkbox-field">
                      <Checkbox.Root
                        className="upload-checkbox-root"
                        id="c1">
                        <Checkbox.Indicator className="upload-checkbox-indicator">
                          <Check size={18} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label
                        className="upload-checkbox-label"
                        htmlFor="c1">
                        Allow comments
                      </label>
                    </FormField>
                    <FormField
                      name="downloads"
                      className="upload-checkbox-field">
                      <Checkbox.Root
                        className="upload-checkbox-root"
                        id="c2">
                        <Checkbox.Indicator className="upload-checkbox-indicator">
                          <Check size={18} />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label
                        className="upload-checkbox-label"
                        htmlFor="c2">
                        Allow downloads
                      </label>
                    </FormField>
                  </fieldset>
                </Form>
              </TabsContent>
            </Tabs>
            <button className="upload-submit-button">Upload video</button>
          </div>
        ) : (
          <div className="upload-dropzone">
            <div
              onClick={triggerVideoSelection}
              className="upload-icon-container">
              <IUpload
                size={36}
                className="upload-icon"
              />
            </div>
            <div className="upload-text-primary">Select video to upload</div>
            <div className="upload-text-secondary">
              Or drag and drop video files
            </div>
            <input
              ref={videoInputRef}
              id="video-upload"
              type="file"
              accept="video/*"
              className="upload-hidden"
              onChange={handleSelectVideo}
            />
            <button
              className="upload-button"
              onClick={triggerVideoSelection}>
              Select video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
