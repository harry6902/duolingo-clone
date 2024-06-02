import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props ={
    activeCourse: {imageSrc:string; title:string};
    hearts:number;
    points:number;
    hasActiveSubscriptions: boolean

}


export const UserProgress =({activeCourse,points,hearts,hasActiveSubscriptions}:Props)=>{
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href={"/courses"}>
                <Button variant={"ghost"}>
                    <Image 
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    className="rounded-md border"
                    width={32} height={32} />
                </Button>
            </Link>
            <Link href={"/shop"}>
                <Button variant={"ghost"}>
                    <Image 
                    src="./points.svg"
                    alt="points"
                    className="mr-2 text-orange-500"
                    width={28} height={28} />
                    {points}
                </Button>
            </Link>
            <Link href={"/shop"}>
                <Button variant={"ghost"}>
                    <Image 
                    src="./heart.svg"
                    alt="Hearts"
                    className="mr-2 text-rose-500"
                    width={22} height={22} />
                    {hasActiveSubscriptions ? <InfinityIcon className="h-4 w-4 stroke-3" /> : hearts}
                </Button>
            </Link>
        </div>
    )
}