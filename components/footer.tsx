import { Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeLogo } from "./theme-logo"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ThemeLogo width={32} height={32} />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Computer College Plus
              </span>
            </div>
            <p className="text-muted-foreground">
              Empowering the next generation of tech professionals with cutting-edge education and hands-on experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Data Analysis
                </Link>
               </li>
               <li> 
                <Link href="/courses" className="hover:text-primary transition-colors">
                  UI/UX Design
                </Link>
                </li>
                <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Wordpress Website Design
                </Link>
                </li>
                <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Microsoft Office Suite
                </Link>
                </li>
                <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Digital Marketing
                </Link>
                </li>
                <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} C Plus. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" className="rounded-full bg-background text-foreground">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-background text-foreground">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-background text-foreground">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
