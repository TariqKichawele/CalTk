'use client';

import { aboutSettingsSchema } from '@/app/lib/zodSchemas';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import React, { useActionState, useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import SubmitButton from '../SubmitButton';
import Image from 'next/image';
import { SettingsAction } from '@/app/actions';
import { UploadDropzone } from '@/app/lib/uploadthing';

interface iAppProps {
    fullName: string
    email: string
    profileImage: string
}

const SettingsForm = ({ fullName, email, profileImage }: iAppProps) => {
    const [ lastResult, action ] = useActionState(SettingsAction, undefined);
    const [ currentProfileImage, setCurrentProfileImage ] = useState(profileImage);

    const [ form, fields ] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: aboutSettingsSchema });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleDeleteImage = () => {
        setCurrentProfileImage("");
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <Label>Full Name</Label>
                <Input
                name={fields.fullName.name}
                key={fields.fullName.key}
                placeholder="Jan Marshall"
                defaultValue={fullName}
                />
                <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input disabled placeholder="Jan Marshall" defaultValue={email} />
            </div>

            <div className="grid gap-y-5">
                <input
                    type="hidden"
                    name={fields.profileImage.name}
                    key={fields.profileImage.key}
                    value={currentProfileImage}
                />
                <Label>Profile Image</Label>
                {currentProfileImage ? (
                    <div className="relative size-16">
                        <Image
                            src={currentProfileImage}
                            alt="Profile"
                            width={300}
                            height={300}
                            className="rounded-lg size-16"
                        />
                        <Button
                            type="button"
                            onClick={handleDeleteImage}
                            variant="destructive"
                            size="icon"
                            className="absolute -top-3 -right-3"
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <UploadDropzone
                        endpoint="imageUploader"
                        appearance={{
                            container: "border-muted",
                        }}
                        onClientUploadComplete={(res) => {
                            setCurrentProfileImage(res[0].url);
                            toast.success("Profile image uploaded");
                        }}
                        onUploadError={(error) => {
                            toast.error(error.message);
                        }}
                    />
                )}
                <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
            </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  )
}

export default SettingsForm