import React,{useState,useEffect} from 'react'

function useScroll(heightVisible) {
     const [visible, setVisible] = useState(false);

     useEffect(() => {
       window.addEventListener("scroll", handleScroll);
       return () => window.removeEventListener("scroll", handleScroll);
     }, []);

     const handleScroll = () => {
       const scrollPosition =
         document.body.scrollTop || document.documentElement.scrollTop;

       if (scrollPosition > heightVisible) {
         setVisible(true);
       } else {
         setVisible(false);
       }
     };
  return (
    [visible]
  )
}

export default useScroll