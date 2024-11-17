'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Link2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const CopylinkMenuitem = ({ meetingUrl }: { meetingUrl: string }) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingUrl);
            toast.success("Copied to clipboard");
        } catch (error) {
            console.error("Error copying to clipboard:", error);
            toast.error("Failed to copy to clipboard");
        }
    };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="mr-2 h-4 w-4" />
      <span>Copy</span>
    </DropdownMenuItem>
  )
}

export default CopylinkMenuitem