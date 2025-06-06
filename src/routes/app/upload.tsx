import { Upload as IUpload, Video } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
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
          <button className="bg-transparent text-gray-900 border-gray-800 hover:border-gray-900 focus:outline-none rounded-lg border-1 hover:bg-gray-50">
            Select file
          </button>
        </div>
      </div>
    </div>
  );
}
