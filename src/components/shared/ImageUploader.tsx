"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormDescription, FormLabel } from "@/components/ui/form";

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void;
  label?: string;
  description?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFilesChange,
  label = "Property Images",
  description = "Upload images of your property. You can upload multiple images.",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...selectedFiles, ...acceptedFiles];
      setSelectedFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [selectedFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    noClick: true,
  });

  const handleRemove = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="md:col-span-2">
      <FormLabel>{label}</FormLabel>
      <FormDescription className="mb-4">{description}</FormDescription>

      <div
        {...getRootProps()}
        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-primary transition"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Drag and drop your images here</p>
          <p className="text-xs text-muted-foreground mb-4">PNG, JPG, WEBP up to 10MB</p>
          <Button type="button" variant="outline" size="sm" onClick={open}>
            Browse Files
          </Button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedFiles.map((file, index) => {
            const preview = URL.createObjectURL(file);
            return (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-red-500 hover:text-white transition hidden group-hover:block"
                  onClick={() => handleRemove(index)}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
