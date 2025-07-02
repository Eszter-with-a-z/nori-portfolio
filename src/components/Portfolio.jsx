"use client"

import { useState, useEffect } from "react"
import { cn } from "../lib/utils.js"
import { 
  Card, CardHeader, CardTitle, CardContent, CardImage, CardIcon
 } from "./Elements.jsx"

const sections = [
  { id: "about", number: "00", title: "About" },
  { id: "project-a", number: "01", iconImg:"public/elemek/elem_2.png", title: "ÆLTER ÆGO" },
  { id: "project-b", number: "02", iconImg:"public/elemek/elem_3.png",title: "Starshaped" },
  { id: "project-c", number: "03", iconImg:"public/elemek/elem_4.png",title: "Street Photography" },
  { id: "project-d", number: "04", iconImg:"public/elemek/elem_5.png",title: "Tour de LFW" },
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
        <div className="flex-1 lg:ml-64 ">
          <div className="pt-20 lg:pt-0 px-4 lg:px-8">
            {/* Information Section */}
            <section id="about" className="h-screen my-12">
              <div className="max-w-4xl mx-auto">
                <div >
                  <CardHeader>
                    <img src="public\elemek\elem_27.png" alt="Nora" />
                    <img src="public\elemek\elem_28.png" alt="Nora" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-center">
                      ars poetica
                    </p>
                  </CardContent>
                </div>
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
            <section id="project-a" className="min-h-screen justify-end">
              <div className="max-w-4xl mx-auto">
                <div className="w-full">
                  <h2 className="text-4xl lg:text-6xl font-bold  flex flex-row justify-between">
                     <CardIcon src="public\elemek\elem_2.png" alt="" />                    
                    ÆLTER ÆGO
                  </h2>
                </div>
                <div className="flex justify-end"> 
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
                          <span key={tech} className="font-mono px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
              </div>
            </section>

            {/* Project B Section */}
            <section id="project-b" className="min-h-screen my-12">
              <div className="max-w-4xl mx-auto">
                <div>
                  <h2 className="text-4xl lg:text-6xl font-bold">
                    <CardIcon src="public\elemek\elem_3.png" alt=""/>
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
            <section id="project-c" className="min-h-screen my-12">
              <div className="max-w-4xl mx-auto">
                <div>
                  <h2 className="text-4xl lg:text-6xl font-bold">
                    <CardIcon src="public\elemek\elem_4.png" alt=""/>
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
            <section id="project-d" className="min-h-screen my-12">
              <div className="max-w-4xl mx-auto">
                <div>
                  <h2 className="text-4xl lg:text-6xl font-bold">
                    <CardIcon src="public\elemek\elem_5.png" alt=""/>
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
