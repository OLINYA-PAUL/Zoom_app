import CallList from "@/components/ui/CallList";
import React from "react";

const Upcoming = () => {
  return (
    <div className="flex size-full flex-col gap-5 text-white">
      <div className="text-3xl font-bold text-white">Upcoming</div>
      <CallList type="upcoming" />
    </div>
  );
};

export default Upcoming;
