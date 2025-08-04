'use client';
import { useEffect, useRef } from "react";

interface InfiniteScrollSentinelProps {
    onIntersect: ()=> void;
    disabled?: boolean;
    rootMargin?: string;
}
export default function InfiniteScrollSentinel({onIntersect, disabled = false, rootMargin = '300px'}:InfiniteScrollSentinelProps){
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        if(disabled || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    onIntersect();
                }
            },
            {
                root:null,
                rootMargin,
                threshold:0,
            }
        );
        observer.observe(sentinelRef.current);

        return ()=> {
            if(sentinelRef.current){
                observer.unobserve(sentinelRef.current);
            }
        }
    },[onIntersect, disabled, rootMargin]);
    return <div ref={sentinelRef} />
}