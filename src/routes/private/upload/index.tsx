import "./styles.css";
import type React from "react";
import { useState, useRef } from "react";
import {
  Check,
  EyeOff,
  Globe,
  Image,
  Upload as IUpload,
  Lock,
  Video,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import { Select } from "@/components";
import * as Checkbox from "@radix-ui/react-checkbox";
import { SelectedFileCard } from "@/components/selected-file-card";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { Input } from "@/components/input";

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

  const [selectedCategory, setSelectedCategory] = useState<string>("5");

  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedPrivacy, setSelectedPrivacy] =
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
                      className="upload-form-textarea"
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
                    renderIcon={() => <Image className="file-card__icon" />}
                    style="outlined"
                    iconContainerStyle="gray"
                    onRemove={removeThumbnail}
                  />
                )}
              </TabsContent>
              <TabsContent value="settings">
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
                          <span className="upload-privacy-text">{o.label}</span>
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
            <p className="upload-text-primary">Select video to upload</p>
            <p className="upload-text-secondary">
              Or drag and drop video files
            </p>
            <input
              ref={videoInputRef}
              id="video-upload"
              type="file"
              accept="video/*"
              className="upload-hidden"
              onChange={handleSelectVideo}
            />
            <Button
              title="Select video"
              className="upload-button"
              onClick={triggerVideoSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
}
