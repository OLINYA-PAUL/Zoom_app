import React, { ReactElement, ReactNode } from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }: { children: ReactNode | ReactElement }) => {
  return (
    <section className="relative">
      <Navbar />
      <div className="flex">
        <aside>
          <Sidebar />
        </aside>
        <section className="flex min-h-screen p-6 max-sm:px-14 flex-1 flex-col pt-26 pb-6 px-6 max-md:pb-14">
          <main className="w-full mt-[90px]">{children}</main>
        </section>
      </div>
    </section>
  );
};

export default HomeLayout;
