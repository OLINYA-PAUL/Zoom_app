"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetUp from "@/components/MeetingSetUp";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetUpComplteted, setIsSetUpComplted] = useState<boolean>(false);
  const { call, isLoadingCall } = useGetCallById(id);

  if (!isLoaded || isLoadingCall) return <Loader />;

  return (
    <section className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplteted ? (
            <MeetingSetUp setIsSetUpComplted={setIsSetUpComplted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </section>
  );
};

export default Meeting;
