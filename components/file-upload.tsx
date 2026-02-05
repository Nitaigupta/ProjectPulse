"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { $Enums } from "@prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (
    value: { name: string; url: string; type: $Enums.FileType }[],
  ) => void;

  value: { name: string; url: string; type: $Enums.FileType }[];
}

export const FileUpload = ({ value, onChange }: FileUploadProps) => {
  const [selectedType, setSelectedType] = useState<$Enums.FileType | undefined>(
    undefined,
  );
  return (
    <div>
      {value?.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {value.map((file, index) => (
            <div
              key={file?.url}
              className="relative w-[200px] h-[200px] rounded-lg"
            >
              <Image
                src={file.type === "IMAGE" ? file.url : "/pdf-icon.png"}
                alt={file.name}
                fill
                className="object-cover rounded-lg"
              />

              <button
                onClick={() => {
                  onChange(value.filter((f) => f.url !== file.url));
                }}
                className="absolute -top-2 -right-2 p-1 bg-rose-500 rounded-full text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedType ? (
        <UploadDropzone
          endpoint={
            selectedType === "IMAGE" ? "imageUploader" : "documentUploader"
          }
          onClientUploadComplete={(res) => {
            const newFiles = res?.map((f) => ({
              name: f.name,
              url: f.ufsUrl,
              type: selectedType,
            }));

            const updatedFiles = [...value, ...newFiles];
            onChange(updatedFiles);
            setSelectedType(undefined);
          }}
          onUploadError={(error: Error) => {
            console.log(`Upload failed: ${error.message}`);
          }}
        />
      ) : (
        <div>
          <Button
            variant={"outline"}
            onClick={() => setSelectedType("IMAGE")}
            className={cn(selectedType === "IMAGE" && "big-slate-200")}
          >
            Image
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setSelectedType("PDF")}
            className={cn(selectedType === "PDF" && "big-slate-200")}
          >
            PDF
          </Button>
        </div>
      )}
    </div>
  );
};
