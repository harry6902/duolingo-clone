import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { on } from "stream";
import Image from 'next/image';

type Props ={
    id:number;
    title:string;
    imgSrc:string;
    onClick: (id:number)=>void;
    disabled?:boolean;
    active?:boolean;
}

export const Card =({
    id,
    title,
    imgSrc,
    onClick,
    disabled,
    active
}:Props)=>{

    return (
        <div onClick={()=>{onClick(id)}}
        className={cn("h-[100%] border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
            disabled &&"pointer-events-none opacity-50"
        )}>
            <div className="min-h-[24px] w-full flex items-center justify-end ">
                {
                    active && (
                        <div className="text-white rounded-md bg-green-600 flex items-center justify-center p-1.5">
                            <Check />

                        </div>
                    )
                }

            </div>
            <Image src={imgSrc}
            alt={title}
            height={70}
            width={93.33}
            className="rounded-lg drop-shadow-md border object-cover" />
            <p className="text-neutral-700 text-center">
                {title}

            </p>
        </div>
    )

}