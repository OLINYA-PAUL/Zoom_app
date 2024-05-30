"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import ReactDatePicker from "react-datepicker";

const MeetingTypesList = () => {
  const [value, setValue] = useState({
    startTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!value.startTime) {
        toast({ title: "Please select a start date & time 😁😁😁" });
      }
      const ramdomID = crypto.randomUUID();

      const call = client.call("default", ramdomID);

      if (!call) throw new Error("No call was initiated");

      const startAt =
        value.startTime.toISOString() || new Date(Date.now()).toISOString();
      const description = value.description || "";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      if (!value.description) router.push(`/meeting/${call.id}`);
      setCallDetails(call);

      toast({ title: "Meeting created sucessfully!! 😜😜😜" });
    } catch (error: any) {
      toast({ title: "Something went wrong try again!!😂😂😂" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className="bg-orange-1"
        description="Start an instant meeting"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
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
      {!callDetails ? (
        <>
          <MeetingModel
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Create meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add a description
              </label>
              <Textarea
                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={value.startTime}
                onChange={(date) => setValue({ ...value, startTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </div>
          </MeetingModel>
        </>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          className="flex-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Copied Successfully" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copied.svg"
          buttonText="Copy meeting link"
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="flex-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Paste your link here"
        className="flex-center"
        buttonText="add the link"
        handleClick={() => router.push(value.link)}
      >
        <Input
          placeholder="write your text here"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          //@ts-ignore
          onClick={(e) => setValue({ ...value, link: e.target.value })}
        />
      </MeetingModel>
    </section>
  );
};

export default MeetingTypesList;
