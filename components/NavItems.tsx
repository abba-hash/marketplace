"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const NavItems = () =>{
    const [activeIndex, setactiveIndex] = useState <null | number>(null)
    const isAnyOpen = activeIndex !== null
    const navRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape"){
                setactiveIndex(null)
            }
        }
        document.addEventListener("keydown", handler)

        return () => {
            document.removeEventListener("keydown", handler)
        }
    },[])
    
    useOnClickOutside(navRef, () => setactiveIndex(null))

    return (
        <div className=" flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) =>{
               const  handleOpen = () => {
                if(activeIndex === i){
                    setactiveIndex(null)
                }else{
                    setactiveIndex(i)
                }
               }
               const isOpen = i === activeIndex
                return (
                    <NavItem 
                    category={category} 
                    handleOpen={handleOpen} 
                    isOpen={isOpen}
                    key={category.value}
                    isAnyOpen = {isAnyOpen}
                    />
                )
            })}
        </div>
    )
}

export default NavItems