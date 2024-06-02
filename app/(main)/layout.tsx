import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/Sidebar";

type props={
    children:React.ReactNode
}


const mainLayout =({children}:props)=>{
   return (
           <div className="">
            <MobileHeader/>
            <Sidebar className="hidden lg:flex"/>
            <main className="lg:pl-[256px]  h-screen pt-[50px] lg:pt-0">
            <div className=" max-w-[1056px] mx-auto pt-6 h-screen">
            {children}
            </div>
            </main>
           </div>
   )
}


export default mainLayout;