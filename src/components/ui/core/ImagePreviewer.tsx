import Image from "next/image";
import React from "react";
import { X } from "lucide-react";
import { Button } from "../button";

type TImagePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}: TImagePreviewer) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="  p-4 rounded-md">
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {imagePreview.map((preview, index) => (
          <div
            key={index}
            className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300"
          >
            <Image
              width={500}
              height={500}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => handleRemove(index)}
              className="bg-red-300 hover:bg-red-400 absolute -top-1 -right-1 w-6 h-6 p-0 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewer;
