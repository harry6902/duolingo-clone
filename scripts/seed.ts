
import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql=neon(process.env.DATABASE_URL!)

const db=drizzle(sql ,{schema});

const main =async ()=>{
    try {
     console.log("Seeding database");

     await db.delete(schema.courses)
     await db.delete(schema.userProgress)
     await db.delete(schema.units)
     await db.delete(schema.lessons)
     await db.delete(schema.challenges)
     await db.delete(schema.challengeOptions)
     await db.delete(schema.challengeProgress)

     await db.insert(schema.courses).values([
        {
            id:1,
            title: "Spanish",
            imgSrc:"/es.svg"
        },
        {
            id:2,
            title: "Italian",
            imgSrc:"/it.svg"
        },
        {
            id:3,
            title: "French",
            imgSrc:"/fr.svg"
        },
        {
            id:4,
            title: "Croatian",
            imgSrc:"/hr.svg"
        }
     ])


     await db.insert(schema.units).values([
        {
            id:1,
            courseId:1, //Spanish
            title:"Unit 1",
            description:"Learn the basics of Spanish",
            order:1
        }
     ]
     )

     await db.insert(schema.lessons).values([
        {
            id:1,
            unitId:1, //unit 1:learn the basics
            order:1,
            title:"Nouns"

        },
      
     ])

     await db.insert(schema.challenges).values([
       { id:1,
        lessonId:1,
        type:"SELECT",
        order:1,
        question:'Which of th following is "the man"?'
       }
    
    ])

    await db.insert(schema.challengeOptions).values([
        {
            id:1,
            challengeId:1,
            correct:true,
            text:"el homre",
            imgSrc:"/man.svg",
            audioSrc:"/es_man.mp3"
        },
        {
            id:2,
            challengeId:1,
            correct:false,
            text:"la mujer",
            imgSrc:"/woman.svg",
            audioSrc:"/es_woman.mp3"
        },
        {
            id:3,
            challengeId:1,
            correct:false,
            text:"el robot",
            imgSrc:"/robot.svg",
            audioSrc:"/es_robot.mp3"
        }
    ])

     console.log("Seeding finished");
        
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed the database")
    }
}


main();