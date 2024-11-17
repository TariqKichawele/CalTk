'use client'

import { updateEventAction } from '@/app/actions';
import { Switch } from '@/components/ui/switch';
import React, { useActionState, useEffect, useTransition } from 'react'
import { toast } from 'sonner';

const MenuActiveSwitcher = ({
    initialChecked,
    eventTypeId
} : {
    initialChecked: boolean;
    eventTypeId: string
}) => {
    const [ isPending, startTransition ] = useTransition();
    const [ state, action ] = useActionState(updateEventAction, undefined);

    useEffect(() => {
        if(state?.status === "success") {
            toast.success("Event Updated Successfully");
        } else if(state?.status === "error") {
            toast.error("Failed to update event");
        }
    }, [state]);

  return (
    <Switch
      defaultChecked={initialChecked}
      disabled={isPending}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            isChecked: isChecked,
            eventTypeId,
          });
        });
      }}
    />
  )
}

export default MenuActiveSwitcher