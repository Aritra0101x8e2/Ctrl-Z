import React from "react"
import  { useState, useEffect } from 'react';

const SecNav = () => {
    const [sticky, setSticky] = useState(false);
  
      useEffect(() => {
          const onScroll = () => {
              setSticky(window.scrollY > 1165 && window.scrollY<4675 ); // toggle at 100px
          };
          window.addEventListener('scroll', onScroll);
          return () => window.removeEventListener('scroll', onScroll);
      }, []);
  return (
    <>
    <div ></div>
      <div className= {`${sticky ? 'fixed top-[26px] left-0 right-0 shadow-md bg-[#100A06] z-30' : 'relative'} 
                   border-2   py-1 justify-center   transition-all duration-500  sm:grid sm:grid-cols-[20px_1fr_20px] gap-0   
                  `}>
        <div className=" min-h-6  bg-[#231b17]"></div>
        <div className=" min-h-30  border-2    py-1  text-[10px] md:text-[15px] text-center items-center">
          <div className="grid  grid-cols-12  min-h-30 ">
            <div className=" grid items-start col-span-6  text-[10px] md:text-[15px]  min-h-6 text-left pl-10 lg:text-3xl text-[#dad2ce] font-bold">An integrated workspace for analytics</div>
            <div className="   col-span-2 grid justify-center text-[10px] md:text-[15px] text-center items-center min-h-6 text-[#bea89d] " ><a href="#DeepDive"> I Dive-deep analysis </a></div>
            <div className="   col-span-2 grid justify-center text-[10px] md:text-[15px] text-center items-center min-h-6 text-[#bea89d]  "><a href="#IntDataPage"> I Interactive data apps </a></div>
            <div className="   col-span-2 grid justify-center text-[10px] md:text-[15px] text-center items-center min-h-6 text-[#bea89d] "><a href="#SelfServe">I Self-serve exploration </a> </div>


          </div>
        </div>
        <div className=" min-h-6   bg-[#231b17]"></div>
      </div>
    </>
  )
}

export default SecNav;