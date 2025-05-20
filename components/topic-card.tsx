"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { ZoomIn } from "@/components/animations/zoom-in"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { TransformEffect } from "@/components/animations/transform-effect"

interface TopicCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  delay?: number
  imageSrc?: string
}

export default function TopicCard({ title, description, icon, href, delay = 0, imageSrc }: TopicCardProps) {
  return (
    <ZoomIn delay={delay} duration={0.4} className="h-full">
      <TransformEffect type="scale" intensity={0.2} className="h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-[#E0E0E0] h-full transform hover:-translate-y-1">
          <Link href={href} className="block h-full">
            <div className="flex flex-col h-full">
              {imageSrc && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={imageSrc || "/placeholder.svg"}
                    alt={title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex items-center mb-3">
                <div className="p-2 bg-[#F0F9FF] rounded-lg mr-3">{icon}</div>
                <h3 className="text-xl font-semibold text-[#333333]">{title}</h3>
              </div>
              <p className="text-sm text-[#666666] flex-grow">{description}</p>
              <div className="mt-4 text-[#6EC1E4] text-sm font-medium flex items-center group">
                <span>Saiba mais</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </TransformEffect>
    </ZoomIn>
  )
}
