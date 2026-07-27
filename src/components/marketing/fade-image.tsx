"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Drop-in replacement for next/image that cross-fades in on load instead
 * of popping in. Pair with a bg-secondary (or similar) class on the
 * containing element so there's a neutral placeholder, not blank white,
 * while the image is still loading, on a slow connection or a phone
 * that's still fetching, that gap is otherwise the most visible seam.
 */
export function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        "transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
