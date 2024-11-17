import EmptyState from '@/app/components/Dashboard/EmptyState';
import { auth } from '@/app/lib/auth'
import prisma from '@/app/lib/db';
import { nylas } from '@/app/lib/nylas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CancelMeetingAction } from '@/app/actions';
import { Separator } from '@/components/ui/separator';
import { fromUnixTime, format } from 'date-fns';
import React from 'react'
import { Video } from 'lucide-react';
import SubmitButton from '@/app/components/SubmitButton';

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      grantEmail: true,
      grantId: true
    }
  });

  if(!userData) {
    throw new Error("User not found");
  };

  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string
    }
  });

  return data;
}

const Meetings = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form key={item.id} action={CancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />{" "}
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        target="_blank"
                        href={item.conferencing.details.url}
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You and {item.participants[0].name}
                    </p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Meetings