"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "./animations/zoom-in"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  animation?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  animation = true,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  const fallbackSrc = `/placeholder.svg?height=${height}&width=${width}`

  const handleError = () => {
    setError(true)
  }

  const ImageComponent = (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
    />
  )

  if (animation) {
    return <ZoomIn>{ImageComponent}</ZoomIn>
  }

  return ImageComponent
}
