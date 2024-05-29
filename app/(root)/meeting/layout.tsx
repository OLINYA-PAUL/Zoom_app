import { Metadata } from "next";
import React, { ReactElement, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zoom application",
  description: "Create and Manage enterprise zoom meet",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const layout = ({ children }: { children: ReactNode | ReactElement }) => {
  return (
    <section>
      {/* <div>Header</div> */}
      <main className="flex flex-col h-screen w-full p-5">{children}</main>
      {/* <div>Footer</div> */}
    </section>
  );
};

export default layout;
