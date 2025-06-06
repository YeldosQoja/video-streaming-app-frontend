import type React from "react";
import { Upload as IUpload, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { formatFileSize } from "../../utils/fileSize";
import { Separator } from "@radix-ui/react-separator";
import { Form, FormControl, FormField, FormLabel } from "@radix-ui/react-form";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
                <div className="text-base font-bold">{selectedFile.name}</div>
                <div className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
              <button className="bg-transparent p-2 self-start border-0 focus:outline-none hover:bg-gray-200">
                <X size={18} />
              </button>
            </div>
          </div>
          <Separator className="bg-gray-200 h-px w-full" />
          <div className="flex flex-col items-stretch p-4 space-y-3">
            <Tabs>
              <TabsList
                defaultValue="details"
                className="flex bg-gray-100 rounded-md">
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
                <Form>
                  <FormField
                    name="title"
                    className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl type="text" />
                  </FormField>
                  <FormField
                    name="title"
                    className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl type="text" />
                  </FormField>
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
