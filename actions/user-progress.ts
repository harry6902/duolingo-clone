"use server"

import { getCoursesById, getUserProgress } from "@/db/dbqueries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress =async(courseId:number)=>{
    const {userId} =await auth();
    const user=await currentUser();

    if(!user || !userId){
        throw new Error("UnAuthorized Request");

    }

    const course= await getCoursesById(courseId);

    if(!course){
        throw new Error("Course not found!!");
    }
    
    // if(!course.unit.length || !course.unit[0].lessons.length){
    //     throw new Error("Course is Empty")
    // }

    const existingUserProgress= await getUserProgress();

    if(existingUserProgress){
        await db.update(userProgress).set({
            activeCourseId:courseId,
            userName: user.firstName || "User",
            userImgSrc : user.imageUrl || "/mascot.svg"
        })
        revalidatePath("/learn")
        revalidatePath("/courses")
        redirect("/learn")
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId:courseId,
        userName: user.firstName || "User",
        userImgSrc : user.imageUrl || "/mascot.svg"
    })

    revalidatePath("/learn")
    revalidatePath("/courses")
    redirect("/learn")

}