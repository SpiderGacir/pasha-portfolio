import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rafi Pasha — Student & Creative Tech Enthusiast',
  description: 'Personal portfolio of Rafi Pasha, a student and creative tech enthusiast exploring web development, AI, digital business, and technology.',
  openGraph: { title: 'Rafi Pasha — Student & Creative Tech Enthusiast', description: 'Building, learning, experimenting.', type: 'website' }
}
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
