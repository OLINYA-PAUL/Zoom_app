"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypesList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstatantMeeting" | undefined
  >();
  const router = useRouter();
  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstatantMeeting");
        }}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModel
        isOpen={meetingState === "isInstatantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="flex-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypesList;