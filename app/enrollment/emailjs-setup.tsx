import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Settings, CheckCircle } from "lucide-react"

export function EmailJSSetup() {
  const steps = [
    {
      title: "Create EmailJS Account",
      description: "Sign up for a free account at EmailJS",
      action: "Go to EmailJS",
      url: "https://www.emailjs.com/",
      icon: Mail,
    },
    {
      title: "Add Email Service",
      description: "Connect your Gmail account or any email service",
      action: "Add Service",
      details: "Choose Gmail and follow the OAuth setup",
      icon: Settings,
    },
    {
      title: "Create Email Template",
      description: "Create a template for enrollment emails",
      action: "Create Template",
      details: "Use the template ID in your code",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">EmailJS Setup Guide</h1>
        <p className="text-muted-foreground">
          Follow these steps to enable email functionality for your enrollment form
        </p>
      </div>

      <Alert>
        <Mail className="h-4 w-4" />
        <AlertDescription>
          EmailJS is completely free for up to 200 emails per month. No credit card required!
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <Icon className="h-5 w-5" />
                  {step.title}
                </CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {step.details && <p className="text-sm text-muted-foreground mb-4">{step.details}</p>}
                {step.url && (
                  <Button asChild>
                    <a href={step.url} target="_blank" rel="noopener noreferrer">
                      {step.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950">
        <CardHeader>
          <CardTitle>Email Template for EmailJS</CardTitle>
          <CardDescription>Copy this template when creating your EmailJS email template</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
              {`Subject: New Course Enrollment: {{from_name}} - {{selected_course}}

New Course Enrollment Submission

PERSONAL INFORMATION
Name: {{first_name}} {{last_name}}
Email: {{email}}
Phone: {{phone}}
Date of Birth: {{date_of_birth}}
Gender: {{gender}}

ADDRESS
Address: {{address}}
City: {{city}}
State/Province: {{state}}
ZIP/Postal Code: {{zip_code}}
Country: {{country}}

EDUCATIONAL BACKGROUND
Highest Education: {{highest_education}}
Institution: {{institution}}
Field of Study: {{field_of_study}}
Graduation Year: {{graduation_year}}

COURSE INFORMATION
Selected Course: {{selected_course}}
Course Level: {{course_level}}
Preferred Start Date: {{start_date}}
Learning Goals: {{learning_goals}}

ADDITIONAL INFORMATION
How they heard about us: {{hear_about_us}}
Special Requirements: {{special_requirements}}
Agreed to Terms: {{agreed_to_terms}}
Subscribe to Newsletter: {{subscribe_newsletter}}

Submission Date: {{submission_date}}

Reply to: {{from_email}}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 dark:bg-green-950">
        <CardHeader>
          <CardTitle>Configuration Values</CardTitle>
          <CardDescription>After setting up EmailJS, replace these values in your code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>YOUR_SERVICE_ID:</strong> Found in EmailJS dashboard → Email Services
            </div>
            <div>
              <strong>YOUR_TEMPLATE_ID:</strong> Found in EmailJS dashboard → Email Templates
            </div>
            <div>
              <strong>YOUR_PUBLIC_KEY:</strong> Found in EmailJS dashboard → Account → API Keys
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
