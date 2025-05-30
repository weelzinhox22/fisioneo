"use client"

import React, { useState, useEffect, useRef } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { X, ChevronRight, ChevronLeft, BookOpen, FileText, Sparkles, PenTool } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"

type FeatureStep = {
  title: string
  description: string
  icon: React.ReactNode
  imageUrl: string
  highlight: string
  color: string
  link?: string // Link to the feature page
}

export default function OnboardingWalkthrough() {
  return null;
}

// This function is exported so it can be called from the navbar
export function openSuggestions() {
  // Create and dispatch a custom event that the OnboardingWalkthrough component will listen to
  const event = new CustomEvent('openSuggestions');
  document.dispatchEvent(event);
} 