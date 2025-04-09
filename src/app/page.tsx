'use client'

import NavbarComponent from "@/components/NavbarComponent";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";


export default function Home() {
  const {push} = useRouter();


  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") push(`/Search`)
  }

  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <div className="w-full bg-[url(/assets/mp-hero-1.jpeg)] bg-cover bg-no-repeat bg-center min-h-180 flex justify-center items-end">
        <div className="relative flex justify-center items-end bottom-40">
          <input className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 " 
          type="text" 
          placeholder="Search Location" 
          onKeyDown={(e)=>handleSearchEnter(e)}
          />
        </div>
      </div>
    </div>
  );
}
