import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CalendarCheck2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import AlmostFinished from "@/public/work-is-almost-over-happy.gif";
import React from 'react'

const GrantId = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
        <Card>
        <CardHeader>
            <CardTitle>You Are Almost Done!</CardTitle>
            <CardDescription>
            We have to now connect your calendar to your account.
            </CardDescription>
            <Image
            src={AlmostFinished}
            alt="Almost Finished"
            className="w-full rounded-lg"
            />
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
            <Link href="/api/auth">
                <CalendarCheck2 className="size-4 mr-2" />
                Connect Calender to Account
            </Link>
            </Button>
        </CardContent>
        </Card>
  </div>
  )
}

export default GrantId