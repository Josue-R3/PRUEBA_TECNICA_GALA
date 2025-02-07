import React, { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="mt-14 w-full bg-orange-50 ">
      {children}
    </div>
  );
}
