import {useState, useRef, useEffect} from 'react'


const onChange = (once, setNearScreen, setInitialized) => (entries, observer)=>{
    const el = entries[0]
    if(el.isIntersecting){
        setNearScreen(true)
        setInitialized(true)
        once && observer.disconnect()
    }else{
        !once && setNearScreen(false)
    }
}
//once => only first render to near element
//over => pagination over ? no more observe : observe element
export const useNearScreen = (once = true, {margin = '160px', over = false})=>{
    const [nearScreen, setNearScreen] = useState(false)
    const [initialized, setInitialized] = useState(false)
    const fromRef = useRef()
    let observer
    useEffect(()=>{
        if(over){
            return
        }
        const element = fromRef.current
        Promise.resolve(
            typeof IntersectionObserver !== 'undefined' ? IntersectionObserver : import('intersection-observer')
        ).then(()=>{
            observer = new IntersectionObserver(onChange(once, setNearScreen, setInitialized), {rootMargin: margin})
            observer.observe(element)
        })
        
        return ()=> observer && observer.disconnect()
    }, [nearScreen])
    return {fromRef, nearScreen, initialized}
}