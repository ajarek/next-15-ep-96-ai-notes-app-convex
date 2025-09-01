'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
})


const SigninForm = () => {

   const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
const [step, setStep] = useState<"signIn" | "signUp">("signIn");
const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      await signIn("password", {
        ...data,
        flow: step,
      });
      toast.success(
        step === "signIn"
          ? "Signed in successfully"
          : "Account created successfully"
      );
      router.push("/notes");
    } catch (error) {
       console.error(error);
      if (
        error instanceof Error &&
        (error.message.includes("InvalidAccountId") ||
          error.message.includes("InvalidSecret"))
      ) {
        form.setError("root", {
          type: "manual",
          message: "Invalid credentials.",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
    toast('You submitted the following values', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className=' w-full max-w-sm'>
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-card m-auto h-fit  rounded-[calc(var(--radius)+.125rem)] border  shadow-md dark:[--color-muted:var(--color-zinc-900)] p-4 space-y-6'
      >
        <div>
          <Link
            href='/'
            aria-label='go home'
          >
            <Image
              src='/logo.webp'
              alt='Logo'
              width={32}
              height={32}
            />
          </Link>
          <h1 className='mb-1 mt-4 text-xl font-semibold'>
            Sign In to Smart Notes
          </h1>
          <p className='text-sm'>Welcome back! Sign in to continue</p>
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='you@example.com'
                  {...field}
                  type='email'
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='********'
                  {...field}
                  type='password'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
              {step === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
      </form>
    </Form>
      <Button
          variant="link"
          type="button"
          className="w-full text-sm text-muted-foreground cursor-pointer"
          onClick={() => {
            setStep(step === "signIn" ? "signUp" : "signIn");
            form.reset(); // Reset form errors and values when switching modes
          }}
        >
          {step === "signIn"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
    </div>
  )
}
export default SigninForm
