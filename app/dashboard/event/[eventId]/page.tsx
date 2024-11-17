import prisma from '@/app/lib/db'
import { notFound } from 'next/navigation';
import React from 'react'
import EditEventForm from '@/app/components/Dashboard/EditEventForm';

async function getData(eventId: string) {
    const data = await prisma.eventType.findUnique({
        where: {
            id: eventId,
        },
        select: {
            title: true,
            url: true,
            description: true,
            duration: true,
            videoCallSoftware: true,
            id: true,
        }
    });

    if(!data) {
        return notFound();
    }

    return data;
}

const Event = async ({ params }: { params: { eventId: string }}) => {
    const data = await getData(params.eventId);
  return (
    <EditEventForm
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.videoCallSoftware}
    />
  )
}

export default Event