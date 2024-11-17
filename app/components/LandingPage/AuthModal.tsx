import { Button } from '@/components/ui/button';
import { signIn } from '@/app/lib/auth';
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { GoogleAuthButton, GitHubAuthButton } from '@/app/components/SubmitButton';

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle className="text-center">Sign in</DialogTitle>
        <DialogHeader className="flex-row justify-center items-center gap-x-2">
          <Image src={Logo} className="size-10" alt="Logo" />
          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Marshal</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-5">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal