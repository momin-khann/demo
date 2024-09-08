"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { uploadImage } from "@/lib/services";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [liveUrl, setLiveUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview); // cleanup for file preview
    };
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));

      setLoading(true);

      uploadImage(file)
        .then((data) => {
          if (data?.fileUrl) setLiveUrl(data.fileUrl);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-20 px-10">
      <div className={"w-fit"}>
        <Label htmlFor="picture">Upload Picture</Label>
        <Input
          id="picture"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {preview && (
        <div className="mt-4">
          <p>Selected file preview:</p>
          <Image
            src={preview}
            width={20}
            height={20}
            alt="Selected file"
            className="w-20 h-20 object-cover mt-2"
          />
        </div>
      )}

      {selectedFile && (
        <div>
          <Link
            href={liveUrl}
            target={"_blank"}
            className={"underline text-blue-600"}
          >
            Click Here,
          </Link>
          to visit live link
        </div>
      )}
    </div>
  );
};
export default Upload;
