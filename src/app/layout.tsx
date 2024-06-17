import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
            <div className={"w-screen bg-emerald-500 backdrop-blur"}>
                <header>
                    <SignedOut>
                        <SignInButton/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </header>
            </div>
            <main>
                {children}
            </main>
            </body>
            </html>
        </ClerkProvider>
    )
}