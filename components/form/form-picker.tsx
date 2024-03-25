"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

import { FormErrors } from "@/components/form/form-errors";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

import { defaultImages } from "@/constants/images";

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isloading, setIsloading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result.status === 200 && result.type === "success") {
          const response = result.response as Array<Record<string, any>>;
          setImages(response);
        } else {
          console.log("Failed to get images from unsplash.");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsloading(false);
      }
    };

    fetchImages();
  }, []);

  if (isloading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="size-6 animate-spin text-sky-700" />
      </div>
    );
  }

  const handleImageSelect = (imageId: string) => {
    if (!pending) {
      setSelectedImageId(imageId);
    }
  };

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              onChange={() => handleImageSelect(image.id)}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt={image.alt_description}
              className="rounded-sm object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
