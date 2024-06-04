import { getCourses, getUserProgress } from '@/db/dbqueries'
import React from 'react'
import { List } from './list';

const page =async () => {
    
    const coursesData=  getCourses();
    const userProgressData= getUserProgress();
    const[courses, userProgress]= await Promise.all([
      coursesData,
      userProgressData
    ])
  return (
    <div className='h-[100%] max-w-[912px] px-3 mx-auto'>
      <h1 className='text-2xl font-bold text-neural-700'>
        Language Courses
      </h1>
      

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
      
    </div>
  )
}

export default page
