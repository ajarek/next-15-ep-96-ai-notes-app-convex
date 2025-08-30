import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Bot, Plus } from 'lucide-react'
import React from 'react'

const Notes = () => {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto flex flex-col items-center justify-start  gap-4 ">
      <Navbar/>
      <section className='w-full flex items-center justify-between px-4 md:px-8 lg:px-16'>
      <h1 className='text-2xl font-bold'>My Notes</h1>
      <div className='flex items-center gap-4'>
        <Button className='flex items-center gap-2' variant={'outline'}><Bot /> Ask AI</Button>
        <Button className='flex items-center gap-2'><Plus/>Create Note</Button>
      </div>

      </section>
    </div>
  )
}

export default Notes