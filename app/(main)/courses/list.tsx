"use client"
import { courses, userProgress } from "@/db/schema"
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";


type Props={
    courses:typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}



export const List=({courses,activeCourseId}:Props)=>{
    const router=useRouter();
    const [pending,startTransition] =useTransition();
    const onClick =(id:number) =>{
        if(pending) return ;

        if(id=== activeCourseId){
            return router.push("/learn");
        }
        startTransition(()=>{
            upsertUserProgress(id).catch(()=>toast.error("Something Went wrong"))
        })
    }

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-auto-fill lg:grid-cols-minmax-210 xl:grid-cols-4 gap-4">
            {courses.map((course)=>(
                <Card key={course.id}
                id={course.id}
                title={course.title}
                imgSrc={course.imgSrc}
                onClick={onClick}
                disabled={pending}
                active={course.id ===activeCourseId} />
            ))}
        </div>
    )

}