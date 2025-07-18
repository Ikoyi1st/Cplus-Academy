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
import Link from "next/link"
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
      duration: "8 weeks",
      level: "Beginner",
      price: "100,000",
      originalPrice: "150,000",
      image: "/web.jpg",
      category: "Web and Mobile Development",
      rating: 4.9,
      students: 3247,
      features: ["HTML & CSS", "CSS (Framework)", "Javascript", "React Native", "Flutter (Basics)"],
      popular: true,
    },
    {
      id: 2,
      title: "Web and Mobile Development - Intermediate",
      description: "Advanced web and mobile development with complex architectures and deployment",
      duration: "10 weeks",
      level: "Intermediate",
      price: "150,000",
      originalPrice: "200,000",
      image: "/web-dev.jpeg",
      category: "Web and Mobile Development",
      rating: 4.8,
      students: 2156,
      features: ["Advanced React", "Microservices", "Cloud Deployment (Github)", "Performance Optimization"],
      popular: false,
    },
    {
      id: 3,
      title: "Web and Mobile Development - Advanced",
      description: "Expert-level web and mobile development with enterprise solutions",
      duration: "10 weeks",
      level: "Advanced",
      price: "200,000",
      originalPrice: "250,000",
      image: "/web3.jpg",
      category: "Web and Mobile Development",
      rating: 4.9,
      students: 1423,
      features: ["System Architecture", "DevOps Integration", "Scalability", "Security"],
      popular: true,
    },
    {
      id: 4,
      title: "Graphic Design Fundamentals",
      description: "Learn essential graphic design principles and tools for creative projects",
      duration: "8 weeks",
      level: "Beginner",
      price: "50,000",
      originalPrice: "70,000",
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
      duration: "10 weeks",
      level: "Intermediate",
      price: "60,000",
      originalPrice: "80,000",
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
      duration: "10 weeks",
      level: "Advanced",
      price: "70,000",
      originalPrice: "90,000",
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
      level: "All",
      price: "150,000",
      originalPrice: "170,000",
      image: "/machine.webp",
      category: "Machine Learning",
      rating: 4.6,
      students: 2145,
      features: ["Python Basics", "ML Fundamentals", "Scikit-learn", "Data Preprocessing", "Model Evaluation"],
      popular: false,
    },
    {
      id: 9,
      title: "UI/UX Design Fundamentals",
      description: "Learn user interface and user experience design principles and tools",
      duration: "8 weeks",
      level: "Beginner",
      price: "170,000",
      originalPrice: "190,000",
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
      duration: "10 weeks",
      level: "Intermediate",
      price: "180,000",
      originalPrice: "200,000",
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
      price: "80,000",
      originalPrice: "100,000",
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
      price: "100,000",
      originalPrice: "120,000",
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
      price: "50,000",
      originalPrice: "80,000",
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
      price: "70,000",
      originalPrice: "100,000",
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
      price: "100,000",
      originalPrice: "120,000",
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
      price: "80,000",
      originalPrice: "100,000",
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
      price: "100,000",
      originalPrice: "120,000",
      image: "/digital.webp",
      category: "Digital Marketing",
      rating: 4.7,
      students: 2234,
      features: ["SEO Advanced", "PPC Optimization", "Marketing Automation", "Influencer Marketing", "ROI Analysis"],
      popular: false,
    },
    {
      id: 18,
      title: "Digital Marketing - Advanced",
      description: "Expert digital marketing with strategy development and team leadership",
      duration: "12 weeks",
      level: "Advanced",
      price: "120,000",
      originalPrice: "140,000",
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
      price: "180,000",
      originalPrice: "200,000",
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
      duration: "10 weeks",
      level: "Intermediate",
      price: "200,000",
      originalPrice: "220,000",
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
      duration: "10 weeks",
      level: "Advanced",
      price: "220,000",
      originalPrice: "240,000",
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
      price: "80,000",
      originalPrice: "100,000",
      image: "/data.jpeg",
      category: "Data Analysis",
      rating: 4.5,
      students: 2789,
      features: ["Excel", "Data Cleaning", "Power Pivot", "Power BI"],
      popular: true,
    },
    {
      id: 23,
      title: "Data Analysis - Intermediate",
      description: "Advanced data analysis with Python, R, and statistical modeling",
      duration: "10 weeks",
      level: "Intermediate",
      price: "80,000",
      originalPrice: "100,000",
      image: "/data2.webp",
      category: "Data Analysis",
      rating: 4.7,
      students: 1956,
      features: ["Power BI Dashboard", "Power Quary", "Data Modeling", "SQL"],
      popular: false,
    },
    {
      id: 24,
      title: "Data Analysis - Advanced",
      description: "Expert data analysis with big data tools and machine learning integration",
      duration: "10 weeks",
      level: "Advanced",
      price: "100,000",
      originalPrice: "120,000",
      image: "/data3.webp",
      category: "Data Analysis",
      rating: 4.8,
      students: 1234,
      features: ["SQL Advance", "Tablue", "Power BI Story Telling", "Python"],
      popular: true,
    },
    {
      id: 25,
      title: "Cybersecurity Fundamentals",
      description: "Essential cybersecurity concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "160,000",
      originalPrice: "180,000",
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
      duration: "12 weeks",
      level: "Intermediate",
      price: "160,000",
      originalPrice: "180,000",
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
      duration: "12 weeks",
      level: "Advanced",
      price: "180,000",
      originalPrice: "200,000",
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
      description: "Essential Project Management concepts and practices for beginners",
      duration: "8 weeks",
      level: "Beginner",
      price: "80,000",
      originalPrice: "100,000",
      image: "/project.webp",
      category: "Project Management",
      rating: 4.6,
      students: 2345,
      features: [
        "Planning & Scheduling",
        "Risk Management",
        "Monitoring & Evaluation",
        "Leadership & Team Management",
        "Basic Tools",
      ],
      popular: true,
    },
    {
      id: 29,
      title: "HR Analytics and Management",
      description: "Top Human Relating analytical concepts and practices for beginners",
      duration: "8 weeks",
      level: "Beginner",
      price: "80,000",
      originalPrice: "100,000",
      image: "/hr.webp",
      category: "HR Analytics and Management",
      rating: 4.6,
      students: 2345,
      features: [
        "Data-Driven Recruitment",
        "Employee Performance Tracking",
        "Workforce Planning",
        "Engagement & Retention Analysis",
        "Policy and Compliance Management",
      ],
      popular: true,
    },
    {
      id: 30,
      title: "Quality Assurance",
      description: "Expert Quality Assurance with Bug Tracking and practices for beginners",
      duration: "8 weeks",
      level: "Beginner",
      price: "220,000",
      originalPrice: "250,000",
      image: "/qa.webp",
      category: "Quality Assurance",
      rating: 4.6,
      students: 2345,
      features: [
        "Test Planning & Strategy",
        "Automation & Manual Testing",
        "Bug Tracking & Reporting",
        "Continuous Improvement",
        "Basic Tools",
      ],
      popular: true,
    },
    {
      id: 31,
      title: "Coding and Animation",
      description: "Animated concepts in both 2d and 3d and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "280,000",
      originalPrice: "300,000",
      image: "/coding2.webp",
      category: "Coding and Animation",
      rating: 4.6,
      students: 2345,
      features: [
        "Programming Foundations",
        "Animation Principles",
        "Frameworks & Tools",
        "Interactivity & User Experience",
        "Optimization",
      ],
      popular: true,
    },
    {
      id: 32,
      title: "Data Science",
      description: "Statistical Analysis concepts and practices for beginners",
      duration: "10 weeks",
      level: "Beginner",
      price: "150,000",
      originalPrice: "200,000",
      image: "/data4.webp",
      category: "Data Science",
      rating: 4.6,
      students: 2345,
      features: [
        "Machine Learning",
        "Data Cleaning & Preparation (Python) ",
        "Data Visualization",
        "Business Integration",
      ],
      popular: true,
    },
    {
      id: 33,
      title: "Virtual Assistant",
      description: "Providing administrative, technical, or creative support",
      duration: "10 weeks",
      level: "Beginner",
      price: "80,000",
      originalPrice: "100,000",
      image: "/virtual-assistant.webp",
      category: "Virtual Assistant",
      rating: 4.6,
      students: 2345,
      features: [
        "Administrative Expertise",
        "Communication Skills",
        "Content & Social Media Support",
        "Self-Management & Reliability",
        "Basic Tools",
      ],
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
    "Project Management",
    "HR Analytics and Management",
    "Quality Assurance",
    "Coding and Animation",
    "Data Science",
    "Virtual Assistant",
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

  // Function to create enrollment URL with course and level parameters
  const createEnrollmentUrl = (courseTitle: string, courseLevel: string) => {
    const encodedCourse = encodeURIComponent(courseTitle)
    const encodedLevel = encodeURIComponent(courseLevel)
    return `/enrollment?course=${encodedCourse}&level=${encodedLevel}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = "https://drive.google.com/file/d/18ssFmzAnc0hvBqKwthK5A06il__hC7b9/view?usp=drive_link"
                  link.download = "Course_Brochure.pdf"
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Brochure
              </Button>
            </motion.div>
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

                    <div className="flex gap-2">
                      <Link href={createEnrollmentUrl(course.title, course.level)} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          Enroll Now
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="default"
                        className="bg-green-500 hover:bg-green-600 text-white border-green-500 px-4"
                        onClick={() => {
                          const message = `Hi! I'm interested in the ${course.title} course (${course.level} level). Can you provide more information about enrollment, schedule, and pricing?`
                          const whatsappUrl = `https://wa.me/2348169288754?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, "_blank")
                        }}
                      >
                        <Image src="/whatsapp.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
                      </Button>
                    </div>
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
