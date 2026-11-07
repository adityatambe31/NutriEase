"use client";
import { useState } from "react";
import { Container } from "@/components/home/Container";
import Image from "next/image";

interface VideoProps {
  data: {
    title: string;
    description: string;
    videoId: string;
    thumbnail: string;
  };
}

export function Video({ data }: Readonly<VideoProps>) {
  const [playVideo, setPlayVideo] = useState(false);
  const { videoId, thumbnail, title } = data;

  if (!videoId) return null;

  return (
    <Container>
      <div className="relative w-full h-[500px] max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl cursor-pointer">
        {!playVideo && (
          <>
            <Image
              src={thumbnail}
              alt={`${title} thumbnail`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity hover:bg-opacity-20">
              <button
                onClick={() => setPlayVideo(true)}
                className="absolute inset-auto w-16 h-16 text-white transform -translate-x-1/2 -translate-y-1/2 lg:w-28 lg:h-28 top-1/2 left-1/2"
                aria-label="Play Video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 lg:w-28 lg:h-28"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Play Video</span>
              </button>
            </div>
          </>
        )}
        {playVideo && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?controls=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full aspect-video"
          ></iframe>
        )}
      </div>
    </Container>
  );
}
