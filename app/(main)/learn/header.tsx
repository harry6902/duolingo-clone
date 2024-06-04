import { Button } from "@/components/ui/button";
import { getUserProgress } from "@/db/dbqueries";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";


type Props={
    title:string;
}

export const Header =async({title}:Props)=>{

   return (
    <div className=" sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 text-neutral-400 lg:z-[40]
    ">
        <Link href={"/courses"}>
            <Button>
                <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />

            </Button>
        
        </Link>
        <h1 className="font-bold text-lg">
            {title}
        </h1>

        <div />

    </div>
   )

}