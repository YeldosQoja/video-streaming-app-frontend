import "./styles.css";
import React, { useRef, useState } from "react";
import { Checkbox, Dialog, Tabs } from "radix-ui";
import { useForm } from "react-hook-form";
import { Check, EyeOff, Globe, Image, Lock, UploadIcon } from "lucide-react";
import { Button, Input, Label, Select } from "@/components";
import { SelectedFileCard } from "@/components/selected-file-card";
import { useCreateVideo, useStartMulipartUpload } from "@/api";
import { RadioGroup } from "@/components/radio-group";
import { UploadVideoForm } from "@/types/video";

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
  const [category, setCategory] = useState<string>("5");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const [privacy, setPrivacy] = useState<string>("public");
  const [playlist, setPlaylist] = useState<string>();
  const [isForKids, setIsForKids] = useState<string>();
  const [ageRestriction, setAgeRestriction] = useState<string>();

  const { mutate: createVideo } = useCreateVideo();
  const { mutate: startUpload } = useStartMulipartUpload();

  const { register, handleSubmit } = useForm<UploadVideoForm>({
    defaultValues: {
      title: "",
      desc: "",
      videoId: "",
      thumbnailId: "",
      playlist: "",
      category: "",
      isForKids: false,
      isAgeRestricted: false,
      allowComments: false,
      allowDownloads: false,
      tags: "",
    },
  });

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

  // const removeSelectedVideo = () => {
  //   setSelectedVideo(null);
  //   setThumbnail(null);
  // };

  const pickThumbnailFromComputer: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSelectThumbnail = () => {
    thumbnailInputRef.current?.click();
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  const uploadVideo = () => {
    if (selectedVideo === null) {
      return;
    }
    startUpload({
      videoFile: selectedVideo,
    });
  };

  const submitVideo = (values: UploadVideoForm) => {
    console.log({ values });
    createVideo(values);
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
                    className="upload-form"
                    onSubmit={handleSubmit(submitVideo)}>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        defaultValue={selectedVideo.name}
                        {...register("title")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        maxLength={5000}
                        className="textarea__desc"
                        placeholder="Tell viewers about your video"
                        {...register("desc")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="playlist">Playlist</Label>
                      <Select
                        options={[
                          { label: "My playlists", value: "1" },
                          { label: "Fun", value: "2" },
                          { label: "Programming", value: "3" },
                        ]}
                        selectedValue={playlist}
                        onValueChange={setPlaylist}
                        triggerStyle={{
                          width: "50%",
                        }}
                        {...register("playlist")}
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
                          selectedValue={category}
                          onValueChange={setCategory}
                          {...register("category")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          type="text"
                          placeholder="Add tags separated by commas"
                          {...register("tags")}
                        />
                      </div>
                    </div>
                    <div>
                      <span>Audience</span>
                      <RadioGroup
                        items={[
                          { id: "for-kids", value: "Yes, it's for kids" },
                          {
                            id: "not-for-kids",
                            value: "No, it's not for kids",
                          },
                        ]}
                        value={isForKids}
                        onValueChange={setIsForKids}
                        {...register("isForKids")}
                      />
                    </div>
                    <div>
                      <span>Age restriction</span>
                      <RadioGroup
                        items={[
                          {
                            id: "age-restriction",
                            value: "Yes, restrict my video to viewers over 18",
                          },
                          {
                            id: "no-age-restriction",
                            value: "No, allow access to anyone",
                          },
                        ]}
                        value={ageRestriction}
                        onValueChange={setAgeRestriction}
                        {...register("isAgeRestricted")}
                      />
                    </div>
                  </form>
                </Tabs.Content>
                <Tabs.Content value="thumbnail">
                  <h3>Upload a thumbnail</h3>
                  <p className="upload-text-secondary">
                    Upload a custom thumbnail that represents your video
                  </p>
                  {!thumbnail ? (
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
                      filename={thumbnail.name}
                      size={thumbnail.size}
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
                      selectedValue={privacy}
                      onValueChange={setPrivacy}
                      {...register("privacy")}
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
                        id="allow-comments"
                        {...register("allowComments")}>
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
                        id="allow-downloads"
                        {...register("allowDownloads")}>
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
                onClick={uploadVideo}
              />
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Upload;
