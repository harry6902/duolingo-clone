import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '../../../components/sticky-wrapper';
import { Header } from './header';
import { UserProgress } from '@/components/user-progress';
import { title } from 'process';
const page = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
        activeCourse={{title:'Spanish',imageSrc:'./es.svg'}}
        hearts={5}
        points={100}
        hasActiveSubscriptions={false} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title='Spanish' />
        <div className='space-y-4'>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>
        <div className='bg-blue-500 h-[440px]'></div>

        </div>
      </FeedWrapper>
      
    </div>
  )
}

export default page
