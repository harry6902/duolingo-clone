import {  relations } from "drizzle-orm";

import { integer, pgEnum, pgTable, serial, text,boolean } from "drizzle-orm/pg-core";


export const courses=pgTable("courses",
    {
        id: serial("id").primaryKey(),
        title:text("title").notNull(),
        imgSrc:text("imaage_src").notNull(),
    }
)

export const courseRelations =relations(courses,({many})=>(
    {
        userProgress:many(userProgress),
        units:many(units)
    }
))

export const units=pgTable("units",
    {
        id:serial("id").primaryKey(),
        title: text("title").notNull(),
        description: text("description").notNull(),
        courseId: integer("course_id").references(()=> courses.id ,{ onDelete:"cascade"}).notNull(),
        order: integer("order").notNull()
    }
)
export const unitRelations =relations(units,({many,one})=>(
    {
        course:one(courses,{
            fields:[units.courseId],
            references:[courses.id]
        }),
        lessons:many(lessons)
    }
))

export const lessons= pgTable("lessons",
    {
        id:serial("id").primaryKey(),
        title:text("title").notNull(),
        unitId:integer("unit_id").references(()=>units.id,{onDelete:"cascade"}).notNull(),
        order:integer("order").notNull()
    }
)

export const lessonsRelation= relations(lessons,({one,many})=>(
    {
        unit: one(units,{
            fields:[lessons.unitId],
            references:[units.id]
        }),
        challenges:many(challenges)
    }
))

export const challengesEnum =pgEnum("type",["SELECT","ASSIST"]);

export const challenges = pgTable("challenges",{

    id:serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(()=> lessons.id, {onDelete:"cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull()
  

})

export const challengesRelations = relations(challenges,({many,one})=>(
    {
        lesson: one(lessons,{
            fields:[challenges.lessonId],
            references:[lessons.id]
        }),
        challengeOptions:many(challengeOptions),
        challengeProgress: many(challengeProgress)
    }
))

export const challengeOptions= pgTable("challenge_options",{
    id:serial("id").primaryKey(),
    text:text("text").notNull(),
    challengeId: integer("challenge_id").references(()=>challenges.id,{onDelete:"cascade"}).notNull(),
   
    correct: boolean("correct").notNull(),
    imgSrc: text("img_src"),
    audioSrc:text("audio_src")
})

export const challengeOptionsRelations = relations(challengeOptions,({many,one})=>(
    {
        challenge:one(challenges,{
            fields:[challengeOptions.challengeId],
            references:[challenges.id]
        }
        )
    }
))

export const challengeProgress = pgTable("challenge_progress",{
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId : integer("challenge_id").references(()=>challenges.id,{onDelete:"cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false)

})

export const challengeProgressRelations = relations(challengeProgress,({one})=>(
    {
        challenge: one(challenges,{
            fields:[challengeProgress.challengeId],
            references:[challenges.id]
        })
    }
))



export const userProgress=pgTable("user_progress",{
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImgSrc: text("user_img_src").notNull().default("/mascot.svg"),
    activeCourseId : integer("active_course_id").references(()=> courses.id,{onDelete:"cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points:integer("points").notNull().default(0)
})

export const userProgressRelation= relations(userProgress,({one})=>
(
    {
        activeCourse: one(courses, {
            fields:[userProgress.activeCourseId],
            references: [courses.id]
        }

        )
    }
))