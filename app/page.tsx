import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = ()=> {
  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto flex flex-col items-center justify-between py-4 md:py-8 lg:py-16">
      <div className="relative w-30 h-30">
        <Image src='/logo.webp' alt='logo' fill className='object-cover'/>
      </div>
      <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight'>Smart Notes</h1>
      <p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed' >A simple note-taking app with AI chatbot integration. Ask the chatbot anything about your notes to retrieve and summarize that information.</p>
      <Button asChild className="px-8 py-3 text-lg">
        <Link href='/notes'>Get Started</Link> 
      </Button>
      <div className="pt-8 text-sm text-muted-foreground">
        <p>Built with Convex and the Vercel AI SDK</p>
      </div>
    </div>
  )
}
export default Home