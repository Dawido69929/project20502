import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import 'remixicon/fonts/remixicon.css'
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
            <body>
                {children}
            </body>
            </html>
        </ClerkProvider>
    )
}