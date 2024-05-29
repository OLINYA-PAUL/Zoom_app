import CallList from "@/components/ui/CallList";
import React from "react";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="text-3xl font-bold text-white">Recording</div>
      <CallList type="recordings" />
    </section>
  );
};

export default Recordings;
