"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Users, Star, Search, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "Master modern web development with React, Node.js, and databases",
      duration: "12 weeks",
      level: "Intermediate",
      price: "$1,299",
      originalPrice: "$1,599",
      image: "/placeholder.svg?height=200&width=300",
      category: "Web Development",
      rating: 4.9,
      students: 2847,
      features: ["React & Next.js", "Node.js & Express", "MongoDB", "Authentication", "Deployment"],
      instructor: "Sarah Johnson",
      popular: true,
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence and machine learning fundamentals",
      duration: "16 weeks",
      level: "Advanced",
      price: "$1,599",
      originalPrice: "$1,999",
      image: "/placeholder.svg?height=200&width=300",
      category: "AI/ML",
      rating: 4.8,
      students: 1923,
      features: ["Python & TensorFlow", "Neural Networks", "Computer Vision", "NLP", "Deep Learning"],
      instructor: "Dr. Michael Chen",
      popular: false,
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications",
      duration: "10 weeks",
      level: "Intermediate",
      price: "$1,199",
      originalPrice: "$1,499",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mobile Development",
      rating: 4.7,
      students: 3156,
      features: ["React Native", "Flutter", "iOS Development", "Android Development", "App Store"],
      instructor: "Emily Rodriguez",
      popular: true,
    },
    {
      id: 4,
      title: "Data Science & Analytics",
      description: "Learn data analysis, visualization, and statistical modeling",
      duration: "14 weeks",
      level: "Intermediate",
      price: "$1,399",
      originalPrice: "$1,699",
      image: "/placeholder.svg?height=200&width=300",
      category: "Data Science",
      rating: 4.8,
      students: 2134,
      features: ["Python & R", "Pandas & NumPy", "Data Visualization", "Statistics", "Machine Learning"],
      instructor: "David Kim",
      popular: false,
    },
    {
      id: 5,
      title: "DevOps & Cloud Computing",
      description: "Master modern deployment and infrastructure management",
      duration: "8 weeks",
      level: "Advanced",
      price: "$999",
      originalPrice: "$1,299",
      image: "/placeholder.svg?height=200&width=300",
      category: "DevOps",
      rating: 4.6,
      students: 1567,
      features: ["Docker & Kubernetes", "AWS/Azure", "CI/CD", "Infrastructure as Code", "Monitoring"],
      instructor: "Alex Thompson",
      popular: false,
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Learn essential cybersecurity concepts and practices",
      duration: "12 weeks",
      level: "Beginner",
      price: "$1,099",
      originalPrice: "$1,399",
      image: "/placeholder.svg?height=200&width=300",
      category: "Cybersecurity",
      rating: 4.7,
      students: 1789,
      features: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance", "Incident Response"],
      instructor: "Lisa Wang",
      popular: true,
    },
  ]

  const categories = [
    "all",
    "Web Development",
    "AI/ML",
    "Mobile Development",
    "Data Science",
    "DevOps",
    "Cybersecurity",
  ]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explore Our Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose from our comprehensive selection of industry-relevant courses designed to advance your career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {course.popular && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">Popular</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{course.level}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base line-clamp-2">{course.description}</CardDescription>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {course.features.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {course.features.length > 4 && (
                        <div className="text-sm text-muted-foreground">+{course.features.length - 4} more topics</div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">by {course.instructor}</div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">No courses found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or browse all courses</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
