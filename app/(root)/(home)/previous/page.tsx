import CallList from "@/components/ui/CallList";
import React from "react";

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="text-3xl font-bold text-white">Previouse</div>
      <CallList type="ended" />
    </section>
  );
};

export default Previous;
