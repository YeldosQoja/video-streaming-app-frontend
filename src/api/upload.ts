import { MultipartUploadDTO, UploadPart, UploadURL } from "@/types/upload";

export const startMultipartUpload = async (videoFile: File) => {
  const response = await fetch("upload/multipart/start", {
    method: "POST",
    body: JSON.stringify({
      contentType: videoFile.type,
      fileSize: videoFile.size,
    }),
  });
  return response;
};

export const completeMultipartUpload = async (
  data: MultipartUploadDTO & { parts: UploadPart[] }
) => {
  return await fetch("upload/multipart/complete", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const abortMultipartUpload = async (data: MultipartUploadDTO) => {
  return await fetch("upload/multipart/abort", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const uploadPart = async ({
  url,
  PartNumber,
  body,
}: UploadURL & { body: ArrayBuffer | Uint8Array<ArrayBuffer> }) => {
  const { ETag } = await new Promise<{ ETag: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onerror = (error) => {
      reject(error);
    };

    xhr.onabort = (event) => {
      const { loaded } = event;
      const error = new Error(
        `The request has been aborted at ${loaded} bytes`
      );
      reject(error);
    };

    xhr.ontimeout = (error) => {
      reject(error);
    };

    xhr.upload.onloadstart = () => {};

    xhr.upload.onprogress = () => {};

    xhr.upload.onload = () => {
      console.log(xhr.response);
      resolve({ ETag: xhr.getResponseHeader("Etag") as string });
    };

    xhr.open("PUT", url, true);

    xhr.send(body);
  });

  return { ETag, PartNumber };
};
