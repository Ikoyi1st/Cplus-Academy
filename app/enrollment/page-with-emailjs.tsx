"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, GraduationCap, CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

// Initialize EmailJS with your public key
emailjs.init("WsdXVBLfaDtCDfiQ9") // Replace with your actual public key

export default function EnrollmentForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Address Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Educational Background
    highestEducation: "",
    institution: "",
    fieldOfStudy: "",
    graduationYear: "",

    // Course Information
    selectedCourse: "",
    courseLevel: "",
    startDate: "",
    learningGoals: "",

    // Additional Information
    hearAboutUs: "",
    specialRequirements: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })

  const courses = [
    "Web and Mobile Development",
    "Graphic Design Fundamentals",
    "Machine Learning Basics",
    "UI/UX Design Fundamentals",
    "WordPress Website Design",
    "Microsoft Office Suite",
    "Digital Marketing Fundamentals",
    "Artificial Intelligence (AI)",
    "Data Analysis Fundamentals",
    "Cybersecurity Fundamentals",
    "Project Management",
    "HR Analytics and Management",
    "Quality Assurance",
    "Coding and Animation",
    "Data Science",
    "Virtual Assistant",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the email template parameters
      const templateParams = {
        to_email: "computercollegeplus@gmail.com",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: `New Course Enrollment: ${formData.firstName} ${formData.lastName} - ${formData.selectedCourse}`,

        // Personal Information
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,

        // Address
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,

        // Education
        highest_education: formData.highestEducation,
        institution: formData.institution,
        field_of_study: formData.fieldOfStudy,
        graduation_year: formData.graduationYear,

        // Course Information
        selected_course: formData.selectedCourse,
        course_level: formData.courseLevel,
        start_date: formData.startDate,
        learning_goals: formData.learningGoals,

        // Additional
        hear_about_us: formData.hearAboutUs,
        special_requirements: formData.specialRequirements,
        agreed_to_terms: formData.agreeToTerms ? "Yes" : "No",
        subscribe_newsletter: formData.subscribeNewsletter ? "Yes" : "No",

        submission_date: new Date().toLocaleString(),
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_czidp38", // Replace with your service ID
        "template_up6abq6", // Replace with your template ID
        templateParams,
        "WsdXVBLfaDtCDfiQ9", // Replace with your public key
      )

      if (result.status === 200) {
        toast({
          title: "Enrollment Submitted Successfully!",
          description: "We've received your enrollment and will contact you soon.",
        })

        // Reset form or redirect
        setTimeout(() => {
          router.push("/courses")
        }, 2000)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enrollment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Education", icon: GraduationCap },
    { number: 3, title: "Course Details", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Course Enrollment
            </h1>
            <p className="text-muted-foreground">Complete your enrollment in just a few simple steps</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div className="mb-8" {...fadeInUp}>
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isActive
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <div className="ml-2 hidden sm:block">
                      <div className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-muted"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                  Step {currentStep}: {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {currentStep === 1 && "Please provide your personal information"}
                  {currentStep === 2 && "Tell us about your educational background"}
                  {currentStep === 3 && "Select your course and preferences"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* All the existing form steps remain the same */}
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                       
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state"><Country></Country> *</Label>
                          <Input
                            id="coutry"
                            value={formData.state}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Educational Background */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="highestEducation">Highest Education Level *</Label>
                          <Select
                            value={formData.highestEducation}
                            onValueChange={(value) => handleInputChange("highestEducation", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="associate">Associate Degree</SelectItem>
                              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                              <SelectItem value="master">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                       
                     )}

                 

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                 
                    {currentStep < 3 ? (
                     
                      <Button
                        type="submit"
                        disabled={!formData.agreeToTerms || isSubmitting}
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Complete Enrollment"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
