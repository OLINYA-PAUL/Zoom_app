import React, { ReactElement, ReactNode } from "react";

const layout = ({ children }: { children: ReactNode | ReactElement }) => {
  return (
    <section>
      <div>Header</div>
      <main className="flex items-center h-screen w-full p-5">{children}</main>
      <div>Footer</div>
    </section>
  );
};

export default layout;
