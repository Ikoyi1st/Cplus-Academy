"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ArrowLeft, ArrowRight, Play } from "lucide-react"
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

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Zephaniah Jackson",
      role: "Data Analytics",
      company: "Freelancing",
      content:
        "I used to avoid anything tech-related, so enrolling in the Data Analytics course at Computer College Plus felt like a big leap. But it turned out to be one of the best learning experiences I've had. The tutors were genuinely supportive and always available to help. I gained practical skills in Excel, Power BI, Power Query, data cleaning, modeling, visualization, and analytics with SQL and Python. Now, I feel confident and ready to grow in my career.",
      avatar: "/Zephaniah.jpg",
      rating: 5,
      course: "Data Analytic",
      beforeRole: "Marketing Assistant",
      salaryIncrease: "150%",
      timeToJob: "3 months",
      featured: true,
    },
    {
      name: "Popoola Abosede",
      role: "Digital Marketing",
      company: "Freelancing",
      content:
        "Enrolling in the Digital Marketing program at Computer College Plus was one of the best decisions I’ve made for my business. I learned powerful strategies including: PPC advertising, social media advertising, content marketing, email marketing, digital analytics, influencer marketing and search engine optimization (SEO) The facilitators delivered the lessons with clarity and passion, making the entire learning experience smooth and impactful. Thanks to Computer College Plus, I now feel more confident in using digital tools to grow my business and improve its online visibility.",
      avatar: "/Abosede.jpg",
      rating: 5,
      course: "Digital Marketing",
      beforeRole: "Entrepreneur",
      salaryIncrease: "200%",
      timeToJob: "2 months",
      featured: true,
    },
    // {
    //   name: "Emily Rodriguez",
    //   role: "Senior Mobile Developer",
    //   company: "Freelancing",
    //   content:
    //     "The mobile development course gave me the skills I needed to transition from web development to mobile. The instructors were patient and the curriculum was comprehensive.",
    //   avatar: "/placeholder.svg?height=80&width=80",
    //   rating: 5,
    //   course: "Mobile App Development",
    //   beforeRole: "Junior Web Developer",
    //   salaryIncrease: "120%",
    //   timeToJob: "4 months",
    //   featured: false,
    // },
  ]

  const stats = [
    { value: "95%", label: "Job Placement Rate" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "156%", label: "Average Salary Increase" },
    { value: "3.5 months", label: "Average Time to Job" },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
              Student Success Stories
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Hear from our graduates who transformed their careers and achieved their dreams in tech
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Success Story
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardHeader className="text-center pb-8">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="text-2xl mb-2">{testimonials[currentTestimonial].name}</CardTitle>
                  <CardDescription className="text-lg">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </CardDescription>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50" />
                  <p className="text-lg text-muted-foreground mb-8 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {testimonials[currentTestimonial].salaryIncrease}
                      </div>
                      <div className="text-sm text-muted-foreground">Salary Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {testimonials[currentTestimonial].timeToJob}
                      </div>
                      <div className="text-sm text-muted-foreground">Time to Job</div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        {testimonials[currentTestimonial].course}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">Course Completed</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of successful graduates who transformed their careers with TechAcademy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 rounded-full"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2">
                  Talk to an Advisor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}