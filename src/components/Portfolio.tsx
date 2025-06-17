"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "information", number: "00", title: "Information" },
  { id: "project-a", number: "01", title: "Project A" },
  { id: "project-b", number: "02", title: "Project B" },
  { id: "project-c", number: "03", title: "Project C" },
  { id: "project-d", number: "04", title: "Project D" },
]

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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

export function Card({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  ...props
}: {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: {
  className?: string
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

export function CardDescription({
  className,
  ...props
}: {
  className?: string
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function CardContent({
  className,
  ...props
}: {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("information")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const NavigationItem = ({ section, isActive }: { section: (typeof sections)[0]; isActive: boolean }) => (
    <button
      onClick={() => scrollToSection(section.id)}
      className={cn(
        "text-left transition-colors duration-200",
        isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="font-mono">{section.number}.</span> {section.title}
    </button>
  )

  const MobileNavItem = ({ section, isActive }: { section: (typeof sections)[0]; isActive: boolean }) => (
    <button
      onClick={() => scrollToSection(section.id)}
      className={cn(
        "px-3 py-2 rounded-md text-sm transition-colors duration-200",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
      )}
    >
      <span className="font-mono">{section.number}.</span>
      {isActive && <span className="ml-1">{section.title}</span>}
    </button>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {sections.map((section) => (
              <MobileNavItem key={section.id} section={section} isActive={activeSection === section.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col p-6 space-y-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Portfolio</h1>
              <p className="text-muted-foreground">John Doe</p>
            </div>
            <nav className="space-y-3">
              {sections.map((section) => (
                <NavigationItem key={section.id} section={section} isActive={activeSection === section.id} />
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="pt-20 lg:pt-0 px-4 lg:px-8">
            {/* Information Section */}
            <section id="information" className="min-h-screen py-12 lg:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">00.</span> Information
                  </h2>
                </div>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>
                      Full-stack developer passionate about creating digital experiences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      I'm a passionate full-stack developer with over 5 years of experience in creating digital
                      solutions. I specialize in React, Next.js, and modern web technologies. My goal is to build
                      applications that not only function flawlessly but also provide exceptional user experiences.
                    </p>
                  </CardContent>
                </Card>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"].map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-muted-foreground">
                        <p>john.doe@example.com</p>
                        <p>+1 (555) 123-4567</p>
                        <p>San Francisco, CA</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Project A Section */}
            <section id="project-a" className="min-h-screen py-12 lg:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">01.</span> Project A
                  </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>E-commerce Platform</CardTitle>
                    <CardDescription>A modern e-commerce solution built with Next.js and Stripe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-muted-foreground">Project Screenshot</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping
                      cart, and payment processing. The application handles thousands of transactions daily and provides
                      a seamless shopping experience.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Next.js", "React", "Stripe", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button>View Live</Button>
                      <Button variant="outline">View Code</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Project B Section */}
            <section id="project-b" className="min-h-screen py-12 lg:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">02.</span> Project B
                  </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Task Management App</CardTitle>
                    <CardDescription>A collaborative task management tool for teams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-muted-foreground">Project Screenshot</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Developed a real-time collaborative task management application that helps teams organize
                      projects, assign tasks, and track progress. Features include drag-and-drop functionality,
                      real-time updates, and team collaboration tools.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["React", "Node.js", "Socket.io", "MongoDB", "Express"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button>View Live</Button>
                      <Button variant="outline">View Code</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Project C Section */}
            <section id="project-c" className="min-h-screen py-12 lg:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">03.</span> Project C
                  </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Dashboard</CardTitle>
                    <CardDescription>A beautiful weather application with forecasting</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-muted-foreground">Project Screenshot</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Created an intuitive weather dashboard that provides current conditions and 7-day forecasts. The
                      app features location-based weather data, interactive charts, and a clean, responsive design.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Vue.js", "Chart.js", "OpenWeather API", "Sass", "PWA"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button>View Live</Button>
                      <Button variant="outline">View Code</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Project D Section */}
            <section id="project-d" className="min-h-screen py-12 lg:py-20">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">04.</span> Project D
                  </h2>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media Analytics</CardTitle>
                    <CardDescription>Analytics dashboard for social media performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-muted-foreground">Project Screenshot</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Built a comprehensive analytics dashboard that aggregates data from multiple social media
                      platforms. Features include real-time metrics, custom reports, and data visualization tools to
                      help businesses track their social media performance.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["React", "D3.js", "Python", "FastAPI", "Redis"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button>View Live</Button>
                      <Button variant="outline">View Code</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
