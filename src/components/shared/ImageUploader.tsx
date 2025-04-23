"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
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
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesChange(acceptedFiles);
  }, [onFilesChange]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
    noClick: true, // we handle click manually
  });

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
    </div>
  );
};
