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
      title: "Web and Mobile Development",
      description: "Master modern web and mobile app development with React, React Native, and Flutter",
      duration: "16 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/web.jpg",
      category: "Web and Mobile Development",
      rating: 4.9,
      students: 3247,
      features: ["React & Next.js", "React Native", "Flutter", "Node.js", "Mobile UI/UX"],
      popular: true,
    },
    {
      id: 2,
      title: "Web and Mobile Development - Intermediate",
      description: "Advanced web and mobile development with complex architectures and deployment",
      duration: "18 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/web-dev.jpeg",
      category: "Web and Mobile Development",
      rating: 4.8,
      students: 2156,
      features: ["Advanced React", "Microservices", "Cloud Deployment", "Performance Optimization", "Testing"],
      popular: false,
    },
    {
      id: 3,
      title: "Web and Mobile Development - Advanced",
      description: "Expert-level web and mobile development with enterprise solutions",
      duration: "20 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/web3.jpg",
      category: "Web and Mobile Development",
      rating: 4.9,
      students: 1423,
      features: ["System Architecture", "DevOps Integration", "Scalability", "Security", "Team Leadership"],
      popular: true,
    },
    {
      id: 4,
      title: "Graphic Design Fundamentals",
      description: "Learn essential graphic design principles and tools for creative projects",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/graphics.jpeg",
      category: "Graphic Design",
      rating: 4.7,
      students: 2834,
      features: ["Adobe Creative Suite", "Design Principles", "Typography", "Color Theory", "Brand Identity"],
      popular: true,
    },
    {
      id: 5,
      title: "Graphic Design - Intermediate",
      description: "Advanced graphic design techniques and professional portfolio development",
      duration: "12 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/graphics-2.png",
      category: "Graphic Design",
      rating: 4.8,
      students: 1967,
      features: ["Advanced Photoshop", "Illustrator Mastery", "InDesign", "Portfolio Building", "Client Work"],
      popular: false,
    },
    {
      id: 6,
      title: "Graphic Design - Advanced",
      description: "Professional graphic design mastery with business and freelancing skills",
      duration: "14 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/graphics3.webp",
      category: "Graphic Design",
      rating: 4.9,
      students: 1234,
      features: ["Creative Direction", "Business Strategy", "Freelancing", "Team Management", "Industry Trends"],
      popular: true,
    },
    {
      id: 7,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts and practical applications",
      duration: "12 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/machine.webp",
      category: "Machine Learning",
      rating: 4.6,
      students: 2145,
      features: ["Python Basics", "ML Fundamentals", "Scikit-learn", "Data Preprocessing", "Model Evaluation"],
      popular: false,
    },
    {
      id: 8,
      title: "Machine Learning - Intermediate",
      description: "Advanced machine learning algorithms and deep learning fundamentals",
      duration: "16 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/machine2.webp",
      category: "Machine Learning",
      rating: 4.8,
      students: 1876,
      features: ["Deep Learning", "TensorFlow", "Neural Networks", "Computer Vision", "NLP Basics"],
      popular: true,
    },
    {
      id: 9,
      title: "UI/UX Design Fundamentals",
      description: "Learn user interface and user experience design principles and tools",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/UI.jpeg",
      category: "UI/UX Design",
      rating: 4.7,
      students: 3156,
      features: ["Design Thinking", "Figma", "User Research", "Wireframing", "Prototyping"],
      popular: true,
    },
    {
      id: 10,
      title: "UI/UX Design - Intermediate",
      description: "Advanced UI/UX design with user testing and design systems",
      duration: "12 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/ui4.webp",
      category: "UI/UX Design",
      rating: 4.8,
      students: 2234,
      features: ["Design Systems", "User Testing", "Advanced Prototyping", "Accessibility", "Mobile Design"],
      popular: false,
    },
    {
      id: 11,
      title: "WordPress Website Design",
      description: "Create professional websites using WordPress and popular themes",
      duration: "8 weeks",
      level: "Beginner",
      price: "-----",
      originalPrice: "----",
      image: "/wordpress.jpeg",
      category: "WordPress Website Design",
      rating: 4.5,
      students: 2567,
      features: ["WordPress Basics", "Theme Customization", "Plugins", "SEO Basics", "Content Management"],
      popular: true,
    },
    {
      id: 12,
      title: "WordPress Website Design - Intermediate",
      description: "Advanced WordPress development with custom themes and e-commerce",
      duration: "10 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/wordpress2.webp",
      category: "WordPress Website Design",
      rating: 4.6,
      students: 1789,
      features: ["Custom Themes", "WooCommerce", "Advanced SEO", "Performance Optimization", "Security"],
      popular: false,
    },
    {
      id: 13,
      title: "Microsoft Office Suite",
      description: "Master Excel, Word, PowerPoint, and other Office applications",
      duration: "6 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/microsoft.jpeg",
      category: "Microsoft Office Suite",
      rating: 4.4,
      students: 4123,
      features: ["Excel Basics", "Word Processing", "PowerPoint", "Outlook", "OneDrive"],
      popular: true,
    },
    {
      id: 14,
      title: "Microsoft Office Suite - Intermediate",
      description: "Advanced Office features including macros, pivot tables, and automation",
      duration: "8 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/microsoft2.webp",
      category: "Microsoft Office Suite",
      rating: 4.6,
      students: 2456,
      features: ["Advanced Excel", "Macros & VBA", "Data Analysis", "Advanced PowerPoint", "Collaboration"],
      popular: false,
    },
    {
      id: 15,
      title: "Microsoft Office Suite - Advanced",
      description: "Expert-level Office skills for business automation and data management",
      duration: "10 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/microsoft4.webp",
      category: "Microsoft Office Suite",
      rating: 4.7,
      students: 1345,
      features: ["Power BI", "Advanced VBA", "Database Integration", "Business Intelligence", "Enterprise Solutions"],
      popular: true,
    },
    {
      id: 16,
      title: "Digital Marketing Fundamentals",
      description: "Learn essential digital marketing strategies and tools",
      duration: "8 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/digital-marketing.jpeg",
      category: "Digital Marketing",
      rating: 4.5,
      students: 3456,
      features: ["Social Media Marketing", "Google Ads", "Email Marketing", "Content Strategy", "Analytics"],
      popular: true,
    },
    {
      id: 17,
      title: "Digital Marketing - Intermediate",
      description: "Advanced digital marketing with conversion optimization and automation",
      duration: "10 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/digital.webp",
      category: "Digital Marketing",
      rating: 4.7,
      students: 2234,
      features: ["SEO Advanced", "PPC Optimization", "Marketing Automation", "A/B Testing", "ROI Analysis"],
      popular: false,
    },
    {
      id: 18,
      title: "Digital Marketing - Advanced",
      description: "Expert digital marketing with strategy development and team leadership",
      duration: "12 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/digital2.webp",
      category: "Digital Marketing",
      rating: 4.8,
      students: 1567,
      features: ["Marketing Strategy", "Brand Management", "Team Leadership", "Budget Management", "Industry Trends"],
      popular: true,
    },
    {
      id: 19,
      title: "Artificial Intelligence (AI)",
      description: "Introduction to AI concepts, applications, and ethical considerations",
      duration: "12 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/Ai.jpg",
      category: "Artificial Intelligence (AI)",
      rating: 4.6,
      students: 2145,
      features: ["AI Fundamentals", "Machine Learning Basics", "Python for AI", "Ethics in AI", "AI Applications"],
      popular: false,
    },
    {
      id: 20,
      title: "Artificial Intelligence (AI) - Intermediate",
      description: "Advanced AI techniques including neural networks and computer vision",
      duration: "16 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/ai2.webp",
      category: "Artificial Intelligence (AI)",
      rating: 4.8,
      students: 1678,
      features: [
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "AI Frameworks",
        "Model Deployment",
      ],
      popular: true,
    },
    {
      id: 21,
      title: "Artificial Intelligence (AI) - Advanced",
      description: "Cutting-edge AI research and enterprise AI implementation",
      duration: "20 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/ai3.webp",
      category: "Artificial Intelligence (AI)",
      rating: 4.9,
      students: 987,
      features: ["AI Research", "Enterprise AI", "AI Strategy", "Advanced Algorithms", "AI Leadership"],
      popular: true,
    },
    {
      id: 22,
      title: "Data Analysis Fundamentals",
      description: "Learn data analysis techniques using Excel, SQL, and basic statistics",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/data.jpeg",
      category: "Data Analysis",
      rating: 4.5,
      students: 2789,
      features: ["Excel for Data", "SQL Basics", "Statistics", "Data Visualization", "Reporting"],
      popular: true,
    },
    {
      id: 23,
      title: "Data Analysis - Intermediate",
      description: "Advanced data analysis with Python, R, and statistical modeling",
      duration: "14 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/data2.webp",
      category: "Data Analysis",
      rating: 4.7,
      students: 1956,
      features: [
        "Python & Pandas",
        "R Programming",
        "Statistical Modeling",
        "Advanced Visualization",
        "Predictive Analytics",
      ],
      popular: false,
    },
    {
      id: 24,
      title: "Data Analysis - Advanced",
      description: "Expert data analysis with big data tools and machine learning integration",
      duration: "16 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/data3.webp",
      category: "Data Analysis",
      rating: 4.8,
      students: 1234,
      features: ["Big Data Tools", "Advanced ML", "Data Engineering", "Business Intelligence", "Data Strategy"],
      popular: true,
    },
    {
      id: 25,
      title: "Cybersecurity Fundamentals",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/cybersecurity.jpeg",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Security Basics", "Network Security", "Password Management", "Threat Awareness", "Basic Tools"],
      popular: true,
    },
    {
      id: 26,
      title: "Cybersecurity - Intermediate",
      description: "Advanced cybersecurity techniques and incident response",
      duration: "14 weeks",
      level: "Intermediate",
      price: "----",
      originalPrice: "----",
      image: "/cyber.webp",
      category: "Cybersecurity",
      rating: 4.7,
      students: 1678,
      features: ["Ethical Hacking", "Penetration Testing", "Incident Response", "Risk Assessment", "Compliance"],
      popular: false,
    },
    {
      id: 27,
      title: "Cybersecurity - Advanced",
      description: "Expert cybersecurity with enterprise security architecture",
      duration: "18 weeks",
      level: "Advanced",
      price: "----",
      originalPrice: "----",
      image: "/cyber2.webp",
      category: "Cybersecurity",
      rating: 4.8,
      students: 987,
      features: [
        "Security Architecture",
        "Advanced Threats",
        "Forensics",
        "Security Leadership",
        "Enterprise Security",
      ],
      popular: true,
    },
    {
      id: 28,
      title: "Project Management",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/project.webp",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Planning & Scheduling", "Risk Management", "Monitoring & Evaluation", "Leadership & Team Management", "Basic Tools"],
      popular: true,
    },
    {
      id: 29,
      title: "HR Analytics and Management",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/hr.webp",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Data-Driven Recruitment", "Employee Performance Tracking", "Workforce Planning", "Engagement & Retention Analysis", "Policy and Compliance Management"],
      popular: true,
    },
    {
      id: 30,
      title: "Quality Assurance",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/qa.webp",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Test Planning & Strategy", "Automation & Manual Testing", "Bug Tracking & Reporting", "Continuous Improvement", "Basic Tools"],
      popular: true,
    },
    {
      id: 31,
      title: "Coding and Animation",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/coding2.webp",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Programming Foundations", "Animation Principles", "Frameworks & Tools", "Interactivity & User Experience", "Optimization"],
      popular: true,
    },
    {
      id: 32,
      title: "Data Science",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "----",
      originalPrice: "----",
      image: "/data4.webp",
      category: "Cybersecurity",
      rating: 4.6,
      students: 2345,
      features: ["Data Cleaning & Preparation", "Statistical Analysis", "Data Visualization", "Business Integration", "Basic Tools"],
      popular: true,
    },
  ]

  const categories = [
    "all",
    "Web and Mobile Development",
    "Graphic Design",
    "Machine Learning",
    "UI/UX Design",
    "WordPress Website Design",
    "Microsoft Office Suite",
    "Digital Marketing",
    "Artificial Intelligence (AI)",
    "Data Analysis",
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
