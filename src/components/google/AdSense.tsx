"use client";

interface AdSenseProps {
  pId: string;
}

export default function AdSense({ pId }: AdSenseProps) {
  if (!pId) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
    />
  );
};