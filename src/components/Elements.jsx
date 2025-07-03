import { cn } from "../lib/utils.js"
import { useEffect, useState, useRef } from "react"
// Elements
export function Button({ children, variant = "default", size = "default", className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        variant === "link" && "underline-offset-4 hover:underline",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 rounded-md px-3",
        size === "lg" && "h-11 rounded-md px-8",
        size === "icon" && "h-10 w-10",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({ children, className, ...props }) {
  return (
    <div className={cn("w-fit rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("font-mono flex flex-col space-y-1.5 p-6 pb-0", className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <p className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6", className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export function CardImage({ className, ...props }){
  return <img className={cn("max-h-screen mr-0", className)} {...props} />
}

export function CardIcon({className, ...props}){
  return <img className={(cn("inline ", "h-12", "lg:h-20", className))} {...props} />                    
}

// Carousel
export function Carousel({ imagesPath, imageNameFormat, totalImages, interval = 3500 , format='jpg'}) {
  const [index, setIndex] = useState(1)
  const touchStartX = useRef(null)

  // Update Index for next image
  const nextIndex = () => {
    setIndex((prev) => (prev % totalImages) + 1)
  }

  const prevIndex = () => {
    setIndex((prev) => (prev - 1 + totalImages - 1) % totalImages + 1)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      nextIndex();
    }, interval)
    return () => clearInterval(timer)
  }, [index])

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevIndex()
      else if (e.key === "ArrowRight") nextIndex()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleDotClick = (dotIndex) => {
    setIndex(dotIndex)
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextIndex()
      else prevIndex()
    }
  }

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

    const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width

    if (clickX < width * 0.2) {
      prevIndex()
    } else if (clickX > width * 0.8) {
      nextIndex()
    }
  }
  

  const imagePath = `${imagesPath}${imageNameFormat}${index}.${format}`

  return (
    
    <div
      className="relative w-full aspect-video bg-muted rounded-lg flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <CardImage src={imagePath} alt={`ÆLTER ÆGO ${index}`} />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalImages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i + 1)}
            className={`h-2 w-2 rounded-full ${
              i + 1 === index ? "bg-foreground" : "bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  )  
}