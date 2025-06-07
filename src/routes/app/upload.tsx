import type React from "react";
import { Upload as IUpload, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { formatFileSize } from "../../utils/fileSize";
import { Separator } from "@radix-ui/react-separator";
import { Form, FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import { Dropdown } from "../../components/dropdown";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("5");

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log({ file });
    }
  };

  const triggerFileSelection = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      {!selectedFile ? (
        <div className="flex flex-col p-3 bg-white rounded-lg min-w-[40%]">
          <div className="flex items-center mb-3">
            <Video
              size={20}
              className="mr-2"
            />
            <h4 className="text-gray-900 text-2xl font-semibold">Video File</h4>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div
              onClick={() => console.log("div clicked")}
              className="bg-gray-100 rounded-full cursor-pointer p-6">
              <IUpload
                size={36}
                className="text-gray-500"
              />
            </div>
            <div className="text-gray-900 text-lg">Select video to upload</div>
            <div className="text-gray-500 text-base">
              Or drag and drop video files
            </div>
            <input
              ref={fileInputRef}
              id="video-upload"
              type="file"
              accept="video/"
              className="hidden"
              onChange={handleSelect}
            />
            <button
              className="bg-transparent text-gray-900 border-gray-800 hover:border-gray-900 focus:outline-none rounded-lg border-1 hover:bg-gray-50"
              onClick={triggerFileSelection}>
              Select file
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-white rounded-lg min-w-[40%]">
          <div className="flex flex-col p-4 space-y-2">
            <div className="flex items-center mb-3">
              <Video
                size={20}
                className="mr-2"
              />
              <h4 className="text-gray-900 text-2xl font-semibold">
                Selected File
              </h4>
            </div>
            <div className="bg-gray-50 self-stretch flex p-3 space-x-3 rounded-md">
              <div className="p-3 rounded-md bg-blue-100">
                <Video className="text-blue-700" />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="text-gray-900 text-base font-bold">
                  {selectedFile.name}
                </div>
                <div className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
              <button
                className="bg-transparent p-2 self-start border-0 focus:outline-none hover:bg-gray-200"
                onClick={() => setSelectedFile(null)}>
                <X size={18} />
              </button>
            </div>
          </div>
          <Separator className="bg-gray-200 h-px w-full" />
          <div className="flex flex-col items-stretch p-4 space-y-4">
            <Tabs defaultValue="details">
              <TabsList className="flex bg-gray-100 rounded-md mb-4">
                <TabsTrigger
                  value="details"
                  className="bg-transparent data-[state=active]:bg-white flex-grow rounded-md p-2 text-gray-950 font-semibold m-1 border-0 focus:outline-none">
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="thumbnail"
                  className="bg-transparent data-[state=active]:bg-white flex-grow rounded-md p-2 text-gray-950 font-semibold m-1 border-0 focus:outline-none">
                  Thumbnail
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="bg-transparent data-[state=active]:bg-white flex-grow rounded-md p-2 text-gray-950 font-semibold m-1 border-0 focus:outline-none">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <Form className="flex flex-col space-y-3">
                  <FormField
                    name="title"
                    className="flex flex-col space-y-2">
                    <FormLabel className="text-gray-900 font-medium">
                      Title
                    </FormLabel>
                    <FormControl
                      type="text"
                      className="bg-transparent text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 px-2 py-1.5"
                      defaultValue={selectedFile.name}
                    />
                  </FormField>
                  <FormField
                    name="description"
                    className="flex flex-col space-y-2">
                    <FormLabel className="text-gray-900 font-medium">
                      Description
                    </FormLabel>
                    <FormControl asChild>
                      <textarea
                        maxLength={5000}
                        className="bg-transparent h-36 text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 p-2 resize-none"
                        placeholder="Tell viewers about your video"
                      />
                    </FormControl>
                  </FormField>
                  <div className="flex self-stretch space-x-4">
                    <FormField
                      name="category"
                      className="flex flex-col flex-1 space-y-2">
                      <FormLabel className="text-gray-900 font-medium">
                        Category
                      </FormLabel>
                      <FormControl asChild>
                        <Dropdown
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
                      className="flex flex-col flex-1 space-y-2">
                      <FormLabel className="text-gray-900 font-medium">
                        Tags
                      </FormLabel>
                      <FormControl asChild>
                        <input
                          type="text"
                          className="bg-transparent text-gray-950 text-base font-medium rounded-md border-2 border-gray-100 px-2 py-1.5"
                          placeholder="Add tags separated by commas"
                        />
                      </FormControl>
                    </FormField>
                  </div>
                </Form>
              </TabsContent>
              <TabsContent value="thumbnail"></TabsContent>
              <TabsContent value="settings"></TabsContent>
            </Tabs>
            <button className="bg-gray-950 text-white font-semibold rounded-md p-3">
              Upload video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
