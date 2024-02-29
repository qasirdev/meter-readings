'use client'
import React from 'react'
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false
});


const Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReduxProvider>
      <div className="
        max-w-[80%]
        min-h-[600px]
        bg-[#faf6f4]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
      ">
        {children}
      </div>
    </ReduxProvider>
  )
}

export default Container