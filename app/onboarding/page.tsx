'use client';

import React, { useActionState } from 'react'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import SubmitButton from '../components/SubmitButton';
import { useForm } from "@conform-to/react";
import { OnboardingAction } from '../actions';
import { parseWithZod } from '@conform-to/zod';
import { onboardingSchemaLocale } from '../lib/zodSchemas';

const Onboarding = () => {
    const [ lastResult, action ] = useActionState(OnboardingAction, undefined);
    const [ form, fields ] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardingSchemaLocale });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to CalTK</CardTitle>
          <CardDescription>
            We need the following information to set up your profile
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Tariq Kichawele"
              />
              <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>

              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm">
                  CalTk.com/
                </span>
                <Input
                  type="text"
                  key={fields.username.key}
                  defaultValue={fields.username.initialValue}
                  name={fields.username.name}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.username.errors}</p>
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <SubmitButton className="w-full" text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Onboarding