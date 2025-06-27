"use client"

import { useState, useEffect } from "react"
import { cn } from "../lib/utils.js"
import { 
  Button, Card, CardHeader, CardTitle, CardDescription,  CardContent, CardFooter, CardImage
 } from "./Elements.jsx"

const sections = [
  { id: "about", number: "00", title: "About" },
  { id: "project-a", number: "01", title: "ÆLTER ÆGO" },
  { id: "project-b", number: "02", title: "Starshaped" },
  { id: "project-c", number: "03", title: "Street Photography" },
  { id: "project-d", number: "04", title: "Tour de LFW" },
]


// Portfolio
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      // Highlight active section
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

  // Scroll to clicked section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const NavigationItem = ({ section, isActive }) => (
    <button
      onClick={() => scrollToSection(section.id)}
      className={cn(
        "lg:block text-left transition-colors duration-200",
        isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="font-mono">{section.number}.</span> {section.title}
    </button>
  )

  const MobileNavItem = ({ section, isActive }) => (
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
              <p className="text-muted-foreground">Nora Julianna</p>
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
            <section id="about" className="min-h-screen py-12">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">00.</span> About
                  </h2>
                </div>
                <Card className="mb-8">
                  <CardHeader>
                    <img src="" alt="" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      ars poetica
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
                        {["something", "like", "street photography", "brutalist", "and other", "keywords"].map((skill) => (
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
                        <p>your.email@example.com</p>
                        <p>+36 phone number</p>
                        <p>Budapest (?), HU</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Project A Section */}
            <section id="project-a" className="min-h-screen py-12">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    <span className="font-mono text-muted-foreground">01.</span> 
                    ÆLTER ÆGO
                  </h2>
                </div>
                <Card>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <CardImage src="src\images\projects\ÆLTER ÆGO\alterego1.jpg" alt="" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      short description
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["key word", "key word2", "key word3"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
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
                    <span className="font-mono text-muted-foreground">02.</span> 
                    Starshaped
                  </h2>
                </div>
                <Card>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <CardImage src="src\images\projects\starshaped\starshaped1.jpg" alt="" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                     xx
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["keyword", "keyword2", "keyword3"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
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
                    <span className="font-mono text-muted-foreground">03.</span> 
                    Street Photography
                  </h2>
                </div>
                <Card>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <CardImage src="src\images\projects\street photography\street_photo_0.jpg másolata.jpg" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      xx
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["keyword", "keyword2", "keyword3"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
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
                    <span className="font-mono text-muted-foreground">04.</span> 
                    Tour de LFW
                  </h2>
                </div>
                <Card>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <CardImage src="nori-portfolio\src\images\projects\tour de LFW\tour_de_LFW_1.jpeg" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      xxx
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["kérdés", "kérdés2", "kérdés3"].map((tech) => (
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
