import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import ModeToggle from './Mode-toggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='w-full h-16 flex items-center justify-between  border-b-2 px-4 md:px-8 lg:px-16'>
      <Link href='/' className='relative w-8 h-8'>
        <Image src={'/logo.webp'} alt='logo' fill className='object-cover' />
      </Link>
      <div className='flex items-center gap-4'>
        <ModeToggle/>
        <Button size={'icon'} variant={'outline'}>
          <LogOut/>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar