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

export default function EnrollmentForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
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

    // Payment Information
    paymentMethod: "",
    installmentPlan: false,

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
    if (currentStep < 4) {
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

    // Only allow submission on the final step
    if (currentStep !== 3) {
      nextStep()
      return
    }

    // Validate required fields
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      selectedCourse: formData.selectedCourse,
      courseLevel: formData.courseLevel,
      startDate: formData.startDate,
    }

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.trim() === "")
      .map(([key, _]) => key)

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

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
        date_of_birth: formData.dateOfBirth || "Not provided",
        gender: formData.gender || "Not provided",

        // Address Information
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,

        // Educational Background
        highest_education: formData.highestEducation || "Not provided",
        institution: formData.institution || "Not provided",
        field_of_study: formData.fieldOfStudy || "Not provided",
        graduation_year: formData.graduationYear || "Not provided",

        // Course Information
        selected_course: formData.selectedCourse,
        course_level: formData.courseLevel,
        start_date: formData.startDate,
        learning_goals: formData.learningGoals || "Not provided",

        // Additional Information
        hear_about_us: formData.hearAboutUs || "Not provided",
        special_requirements: formData.specialRequirements || "None",
        agreed_to_terms: formData.agreeToTerms ? "Yes" : "No",
        subscribe_newsletter: formData.subscribeNewsletter ? "Yes" : "No",

        // System Information
        submission_date: new Date().toLocaleString(),
        submission_time: new Date().toISOString(),

        // Formatted summary for easy reading
        enrollment_summary: `
ENROLLMENT DETAILS
==================

PERSONAL INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Date of Birth: ${formData.dateOfBirth || "Not provided"}
- Gender: ${formData.gender || "Not provided"}

ADDRESS:
- Address: ${formData.address}
- City: ${formData.city}
- State/Province: ${formData.state}
- ZIP/Postal Code: ${formData.zipCode}
- Country: ${formData.country}

EDUCATIONAL BACKGROUND:
- Highest Education: ${formData.highestEducation || "Not provided"}
- Institution: ${formData.institution || "Not provided"}
- Field of Study: ${formData.fieldOfStudy || "Not provided"}
- Graduation Year: ${formData.graduationYear || "Not provided"}

COURSE INFORMATION:
- Selected Course: ${formData.selectedCourse}
- Course Level: ${formData.courseLevel}
- Preferred Start Date: ${formData.startDate}
- Learning Goals: ${formData.learningGoals || "Not provided"}

ADDITIONAL INFORMATION:
- How they heard about us: ${formData.hearAboutUs || "Not provided"}
- Special Requirements: ${formData.specialRequirements || "None"}
- Agreed to Terms: ${formData.agreeToTerms ? "Yes" : "No"}
- Subscribe to Newsletter: ${formData.subscribeNewsletter ? "Yes" : "No"}

Submitted on: ${new Date().toLocaleString()}
  `.trim(),
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_czidp38", // Your EmailJS service ID
        "template_up6abq6", // Your EmailJS template ID
        templateParams,
        "WsdXVBLfaDtCDfiQ9", // Your EmailJS public key
      )

      if (result.status === 200) {
        // Show success alert
        setShowSuccessAlert(true)

        toast({
          title: "Enrollment Submitted Successfully!",
          description: "We've received your enrollment and will contact you soon.",
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
          zipCode: "",
          country: "",
          highestEducation: "",
          institution: "",
          fieldOfStudy: "",
          graduationYear: "",
          selectedCourse: "",
          courseLevel: "",
          startDate: "",
          learningGoals: "",
          paymentMethod: "",
          installmentPlan: false,
          hearAboutUs: "",
          specialRequirements: "",
          agreeToTerms: false,
          subscribeNewsletter: false,
        })

        setCurrentStep(1)

        // Hide success alert and redirect after delay
        setTimeout(() => {
          setShowSuccessAlert(false)
          router.push("/courses")
        }, 4000)
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

      toast({
        title: "Submission Failed",
        description: errorMessage,
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
                      hours to discuss the next steps.
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
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
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
                          <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleInputChange("country", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nigeria">Nigeria</SelectItem>
                              <SelectItem value="ghana">Ghana</SelectItem>
                              <SelectItem value="kenya">Kenya</SelectItem>
                              <SelectItem value="south-africa">South Africa</SelectItem>
                              <SelectItem value="usa">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="canada">Canada</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <div className="space-y-2">
                          <Label htmlFor="graduationYear">Graduation Year</Label>
                          <Input
                            id="graduationYear"
                            type="number"
                            min="1950"
                            max="2030"
                            value={formData.graduationYear}
                            onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution/School Name</Label>
                        <Input
                          id="institution"
                          value={formData.institution}
                          onChange={(e) => handleInputChange("institution", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fieldOfStudy">Field of Study</Label>
                        <Input
                          id="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                          placeholder="e.g., Computer Science, Business Administration"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Course Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="selectedCourse">Select Course *</Label>
                        <Select
                          value={formData.selectedCourse}
                          onValueChange={(value) => handleInputChange("selectedCourse", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your course" />
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
                        <Label htmlFor="courseLevel">Course Level *</Label>
                        <Select
                          value={formData.courseLevel}
                          onValueChange={(value) => handleInputChange("courseLevel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startDate">Preferred Start Date *</Label>
                        <Select
                          value={formData.startDate}
                          onValueChange={(value) => handleInputChange("startDate", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select start date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="next-week">Next Week</SelectItem>
                            <SelectItem value="next-month">Next Month</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="learningGoals">Learning Goals & Expectations</Label>
                        <Textarea
                          id="learningGoals"
                          value={formData.learningGoals}
                          onChange={(e) => handleInputChange("learningGoals", e.target.value)}
                          placeholder="Tell us what you hope to achieve with this course..."
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                        <Select
                          value={formData.hearAboutUs}
                          onValueChange={(value) => handleInputChange("hearAboutUs", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Search</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="friend">Friend/Referral</SelectItem>
                            <SelectItem value="advertisement">Advertisement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                            />
                            <Label htmlFor="agreeToTerms" className="text-sm">
                              I agree to the{" "}
                              <a href="#" className="text-primary underline">
                                Terms and Conditions
                              </a>{" "}
                              and{" "}
                              <a href="#" className="text-primary underline">
                                Privacy Policy
                              </a>{" "}
                              *
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Next Step
                      </Button>
                    ) : (
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
