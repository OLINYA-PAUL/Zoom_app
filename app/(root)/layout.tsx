import { ReactNode } from "react";

import StreamVideoProvider from "@/providers/StreamClientProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zoom application",
  description: "Create and Manage enterprise zoom meet",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
