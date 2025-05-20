'use client';

import React, { useRef, useEffect } from 'react';

// Define valid split types
type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines' | 'chars,words,lines';

interface SplitProps {
  element: HTMLElement;
  type: SplitType;
}

export class SplitText {
  element: HTMLElement;
  originalHTML: string;
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  types: string[];

  constructor({ element, type = 'chars' }: SplitProps) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    this.types = type.split(',');
    
    this.split();
  }
  
  split() {
    // Preserve the original HTML
    this.originalHTML = this.element.innerHTML;
    
    if (this.types.includes('lines')) {
      this.splitLines();
    }
    
    if (this.types.includes('words')) {
      this.splitWords();
    }
    
    if (this.types.includes('chars')) {
      this.splitChars();
    }
  }
  
  splitLines() {
    const text = this.element.textContent || '';
    const words = text.trim().split(' ');
    const linesContent: string[] = [];
    
    // Clear current content
    this.element.innerHTML = '';
    
    // Create a temporary container with the same styling
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.width = getComputedStyle(this.element).width;
    tempContainer.style.fontSize = getComputedStyle(this.element).fontSize;
    tempContainer.style.fontFamily = getComputedStyle(this.element).fontFamily;
    tempContainer.style.fontWeight = getComputedStyle(this.element).fontWeight;
    tempContainer.style.letterSpacing = getComputedStyle(this.element).letterSpacing;
    document.body.appendChild(tempContainer);
    
    let currentLine = '';
    let lastTop = 0;
    
    // Test each word to see if it creates a new line
    words.forEach((word, i) => {
      const testWord = i === 0 ? word : currentLine + ' ' + word;
      tempContainer.textContent = testWord;
      const currentTop = tempContainer.offsetTop;
      
      if (currentTop > lastTop && i > 0) {
        // New line detected
        linesContent.push(currentLine);
        currentLine = word;
        lastTop = currentTop;
      } else {
        currentLine = testWord;
      }
      
      // Last word
      if (i === words.length - 1) {
        linesContent.push(currentLine);
      }
    });
    
    // Remove the temp container
    document.body.removeChild(tempContainer);
    
    // Create line elements
    linesContent.forEach(content => {
      const lineElement = document.createElement('div');
      lineElement.className = 'split-line';
      lineElement.style.display = 'block';
      lineElement.textContent = content;
      this.element.appendChild(lineElement);
      this.lines.push(lineElement);
    });
  }
  
  splitWords() {
    // If we already have lines, split those
    if (this.lines.length > 0) {
      this.lines.forEach(line => {
        const lineContent = line.textContent || '';
        const words = lineContent.trim().split(' ');
        
        // Clear the line
        line.innerHTML = '';
        
        // Create word elements
        words.forEach(word => {
          const wordElement = document.createElement('div');
          wordElement.className = 'split-word';
          wordElement.style.display = 'inline-block';
          wordElement.style.marginRight = '0.25em'; // Add space between words
          wordElement.textContent = word;
          line.appendChild(wordElement);
          this.words.push(wordElement);
        });
      });
    } else {
      // Split directly from the element
      const content = this.element.textContent || '';
      const words = content.trim().split(' ');
      
      // Clear the element
      this.element.innerHTML = '';
      
      // Create word elements
      words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'split-word';
        wordElement.style.display = 'inline-block';
        wordElement.style.marginRight = '0.25em'; // Add space between words
        wordElement.textContent = word;
        this.element.appendChild(wordElement);
        this.words.push(wordElement);
      });
    }
  }
  
  splitChars() {
    // If we already have words, split those
    if (this.words.length > 0) {
      this.words.forEach(word => {
        const wordContent = word.textContent || '';
        const chars = wordContent.split('');
        
        // Clear the word
        word.innerHTML = '';
        
        // Create char elements
        chars.forEach(char => {
          const charElement = document.createElement('div');
          charElement.className = 'split-char';
          charElement.style.display = 'inline-block';
          charElement.textContent = char;
          word.appendChild(charElement);
          this.chars.push(charElement);
        });
      });
    } else {
      // Split directly from the element or lines
      const elements = this.lines.length > 0 ? this.lines : [this.element];
      
      elements.forEach(element => {
        const content = element.textContent || '';
        const chars = content.split('');
        
        // Clear the element
        element.innerHTML = '';
        
        // Create char elements
        chars.forEach(char => {
          const charElement = document.createElement('div');
          charElement.className = 'split-char';
          charElement.style.display = 'inline-block';
          charElement.textContent = char;
          element.appendChild(charElement);
          this.chars.push(charElement);
        });
      });
    }
  }
  
  revert() {
    // Restore the original HTML
    this.element.innerHTML = this.originalHTML;
    
    // Clear arrays
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

// React hook for using SplitText
export const useSplitText = (type: SplitType = 'chars') => {
  const ref = useRef<HTMLElement>(null);
  const splitInstance = useRef<SplitText | null>(null);
  
  useEffect(() => {
    if (ref.current) {
      // Create new instance
      splitInstance.current = new SplitText({
        element: ref.current,
        type,
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (splitInstance.current) {
        splitInstance.current.revert();
      }
    };
  }, [type]);
  
  return { ref, split: splitInstance.current };
}; 