"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, Loader2, Mail, User, GraduationCap, BookOpen, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import emailjs from "@emailjs/browser"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

// Initialize EmailJS with your public key
emailjs.init("WsdXVBLfaDtCDfiQ9")

function EnrollmentFormContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
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
    country: "",

    // Educational Background
    highestEducation: "",

    // Course Information - These will be auto-populated
    selectedCourse: "",
    courseLevel: "",
    learningGoals: "",
    // Additional Information
    hearAboutUs: "",
    specialRequirements: "",
  })
  const searchParams = useSearchParams()

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

  const courseLevels = ["Beginner", "Intermediate", "Advanced", "Professional"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Auto-populate course and level from URL parameters
  useEffect(() => {
    const courseFromUrl = searchParams.get("course")
    const levelFromUrl = searchParams.get("level")

    if (courseFromUrl) {
      setFormData((prev) => ({
        ...prev,
        selectedCourse: decodeURIComponent(courseFromUrl),
        courseLevel: levelFromUrl || "Beginner",
      }))
    }
  }, [searchParams])

  // Show browser alert popup
  const showSuccessPopup = () => {
    alert(
      `🎉 Enrollment Submitted Successfully!\n\nThank you ${formData.firstName} ${formData.lastName}!\n\nYour enrollment for "${formData.selectedCourse}" (${formData.courseLevel} level) has been received.\n\nWe will contact you within 24 hours at ${formData.email}.\n\nYou will be redirected to the courses page shortly.`,
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.selectedCourse || !formData.courseLevel) {
      alert(
        "⚠️ Course Not Selected\n\nPlease go back to the courses page and click 'Enroll Now' on your desired course.",
      )
      return
    }

    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    }

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.trim() === "")
      .map(([key, _]) => key)

    if (missingFields.length > 0) {
      alert(
        "⚠️ Missing Required Fields\n\nPlease fill in all required fields before submitting:\n\n" +
          missingFields
            .map((field) => `• ${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}`)
            .join("\n"),
      )
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the email template parameters
      const templateParams = {
        to_email: "computercollegeplus@gmail.com",
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: `New Course Enrollment: ${formData.firstName} ${formData.lastName} - ${formData.selectedCourse} (${formData.courseLevel})`,

        // Personal Information
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || "Not provided",
        gender: formData.gender || "Not provided",

        // Address Information
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,

        // Educational Background
        highest_education: formData.highestEducation || "Not provided",

        // Course Information (Key fields for tracking)
        selected_course: formData.selectedCourse,
        course_level: formData.courseLevel,
        learning_goals: formData.learningGoals || "Not provided",

        // Additional Information
        hear_about_us: formData.hearAboutUs || "Not provided",
        special_requirements: formData.specialRequirements || "None",

        // System Information
        submission_date: new Date().toLocaleString(),
        submission_time: new Date().toISOString(),

        // Formatted summary for easy reading
        enrollment_summary: `
COURSE ENROLLMENT APPLICATION
============================

COURSE DETAILS:
- Course: ${formData.selectedCourse}
- Level: ${formData.courseLevel}
- Learning Goals: ${formData.learningGoals || "Not specified"}

STUDENT INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Date of Birth: ${formData.dateOfBirth || "Not provided"}
- Gender: ${formData.gender || "Not provided"}

ADDRESS:
- Address: ${formData.address}
- City: ${formData.city}
- State/Province: ${formData.state}
- Country: ${formData.country}

EDUCATIONAL BACKGROUND:
- Highest Education: ${formData.highestEducation || "Not provided"}

ADDITIONAL INFORMATION:
- How they heard about us: ${formData.hearAboutUs || "Not provided"}
- Special Requirements: ${formData.specialRequirements || "None"}

Submitted on: ${new Date().toLocaleString()}
        `.trim(),
      }

      console.log("Sending email with params:", templateParams)

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_czidp38", // Your EmailJS service ID
        "template_up6abq6", // Your EmailJS template ID
        templateParams,
        "WsdXVBLfaDtCDfiQ9", // Your EmailJS public key
      )

      console.log("EmailJS result:", result)

      if (result.status === 200) {
        // Show success popup alert
        showSuccessPopup()

        // Show success alert banner
        setShowSuccessAlert(true)

        // Show toast notification
        toast({
          title: "Enrollment Submitted Successfully! 🎉",
          description: `Your enrollment for ${formData.selectedCourse} (${formData.courseLevel}) has been received. We'll contact you soon!`,
        })

        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          city: "",
          state: "",
          country: "",
          highestEducation: "",
          selectedCourse: "",
          courseLevel: "",
          learningGoals: "",
          hearAboutUs: "",
          specialRequirements: "",
        })

        // Hide success alert and redirect after delay
        setTimeout(() => {
          setShowSuccessAlert(false)
          router.push("/courses")
        }, 5000)
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`)
      }
    } catch (error) {
      console.error("EmailJS Error:", error)

      let errorMessage = "There was an error submitting your enrollment. Please try again."

      if (error instanceof Error) {
        if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage = "Network error. Please check your internet connection and try again."
        } else if (error.message.includes("service") || error.message.includes("template")) {
          errorMessage = "Email service configuration error. Please contact support."
        }
      }

      // Show error popup
      alert(`❌ Submission Failed\n\n${errorMessage}\n\nPlease try again or contact support if the problem persists.`)

      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 pb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
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
              Course Enrollment Application
            </h1>
            <p className="text-muted-foreground">Complete your enrollment in one simple form</p>
          </motion.div>

          {/* Success Alert */}
          {showSuccessAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Enrollment Submitted Successfully! 🎉
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mt-1">
                      Thank you for your enrollment! We've received your application and will contact you within 24
                      hours.
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      You will be redirected to the courses page shortly...
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSuccessAlert(false)}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Enrollment Application
                </CardTitle>
                <CardDescription>
                  Please fill out all required fields to complete your course enrollment
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Selected Course Display */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Selected Course</h3>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border-2 border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-primary">
                            {formData.selectedCourse || "No course selected"}
                          </h4>
                          <p className="text-lg text-muted-foreground">
                            Level: {formData.courseLevel || "Not specified"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {formData.selectedCourse ? (
                            <>
                              <CheckCircle className="h-6 w-6 text-green-500" />
                              <span className="text-sm font-medium text-green-600">Auto-selected</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-6 w-6 text-yellow-500" />
                              <span className="text-sm font-medium text-yellow-600">Not selected</span>
                            </>
                          )}
                        </div>
                      </div>

                      {(!formData.selectedCourse || !formData.courseLevel) && (
                        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                            ⚠️ No course was pre-selected. Please go back to the courses page and click "Enroll Now" on
                            your desired course, or select one manually below.
                          </p>
                          <div className="mt-4 grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="manualCourse">Select Course</Label>
                              <Select
                                value={formData.selectedCourse}
                                onValueChange={(value) => handleInputChange("selectedCourse", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a course" />
                                </SelectTrigger>
                                <SelectContent>
                                  {courses.map((course) => (
                                    <SelectItem key={course} value={course}>
                                      {course}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="manualLevel">Course Level</Label>
                              <Select
                                value={formData.courseLevel}
                                onValueChange={(value) => handleInputChange("courseLevel", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose level" />
                                </SelectTrigger>
                                <SelectContent>
                                  {courseLevels.map((level) => (
                                    <SelectItem key={level} value={level}>
                                      {level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="learningGoals">Learning Goals (Optional)</Label>
                      <Textarea
                        id="learningGoals"
                        placeholder="What do you hope to achieve with this course?"
                        value={formData.learningGoals}
                        onChange={(e) => handleInputChange("learningGoals", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                    </div>

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
                        <Label htmlFor="dateOfBirth">Date of Birth (Month & Day)</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => {
                            // Extract month and day only
                            const date = new Date(e.target.value)
                            const month = String(date.getMonth() + 1).padStart(2, "0")
                            const day = String(date.getDate()).padStart(2, "0")
                            handleInputChange("dateOfBirth", `${month}-${day}`)
                          }}
                          placeholder="MM-DD"
                        />
                      </div>
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
                  </div>

                  {/* Address Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
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
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Educational Background Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Educational Background</h3>

                    <div className="grid md:grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="highestEducation">Highest Education Level</Label>
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
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                      <Select
                        value={formData.hearAboutUs}
                        onValueChange={(value) => handleInputChange("hearAboutUs", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="friend-referral">Friend/Family Referral</SelectItem>
                          <SelectItem value="advertisement">Advertisement</SelectItem>
                          <SelectItem value="website">Our Website</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequirements">Special Requirements or Comments</Label>
                      <Textarea
                        id="specialRequirements"
                        placeholder="Any special accommodations or additional information..."
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Enrollment...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Complete Enrollment
                        </>
                      )}
                    </Button>
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

export default function EnrollmentForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading enrollment form...</p>
          </div>
        </div>
      }
    >
      <EnrollmentFormContent />
    </Suspense>
  )
}
