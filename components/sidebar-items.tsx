"use client"

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { pathToFileURL } from "url";
import Link from "next/link";
import Image from "next/image";

type Props ={
    label: string;
    iconSrc:string;
    href:string;
}
export const SidebarItems =({label,iconSrc,href}:Props)=>{

    const pathName=usePathname()
    const active= pathName===href

    return (
      <Button variant={ active? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]" asChild>
        <Link href={href}>
        <Image src={iconSrc} className="mr-5"
        height={32}
        width={32} 
        alt={label}/>
        {label}
        </Link>
      </Button>
      
    )
}