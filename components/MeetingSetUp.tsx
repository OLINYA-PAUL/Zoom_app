import {
  CallState,
  CallingState,
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Loader from "./Loader";

const MeetingSetUp = ({
  setIsSetUpCompleted,
}: {
  setIsSetUpCompleted: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsisMicCamToggledOn] = useState<boolean>(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  // if (callingState !== CallingState.JOINED) return <Loader />;

  const call = useCall();
  if (!call) throw alert("please start a call");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold ">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsisMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetUpCompleted(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetUp;
