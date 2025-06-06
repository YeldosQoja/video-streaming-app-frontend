import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Upload as IUpload, Video, X } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Video className="w-5 h-5" />
                <Typography component="span">Video File</Typography>
              </CardHeader>
              <CardContent>
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <IUpload />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select video to upload
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Or drag and drop a file
                    </p>
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer">
                      <Button variant="outlined">
                        Select File
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </Button>
                    </label>
                    <p className="text-xs text-gray-400 mt-4">
                      Your videos will be private until you publish them.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Video className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedFile.size}
                        </p>
                      </div>
                      <Button
                        variant="contained"
                        size="medium">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedFile && (
              <Card>
                <CardHeader>
                  <Typography>Video Details</Typography>
                </CardHeader>
                <CardContent>
                  <Tabs
                    defaultValue="details"
                    className="w-full">
                    <Tab value="details" />
                    <Tab value="thumbnail" />
                    <Tab value="settings" />
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
