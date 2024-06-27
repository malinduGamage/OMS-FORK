import { useEffect, useState } from "react";

const getLocalValue = (key,initValue)=>{
    const localValue = localStorage.getItem(key)

    //check whether value is null
    if(localValue!==null){
        try {

            return(JSON.parse(localValue))
            
        } catch (error) {

            console.log("Failed to parse localstorage value: ",error);
            return initValue
            
        }
    }

    //if a function is passed the executed result is assigned to initvalue
    if (initValue instanceof Function) return initValue()

        return initValue
}


const useLocalStorage = (key,initvalue)=>{

    const [value, setValue] = useState(()=>{
        return getLocalValue(key,initvalue)
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue]
}










// const useLocalStorage = (key, initValue) => {
//   // Initialize state with the value from localStorage or the initial value
//   const [value, setValue] = useState(() => {
//     const localValue = localStorage.getItem(key);

//     // If there's a value in localStorage, parse and return it
//     if (localValue !== null) {
//       try {
//         return JSON.parse(localValue);
//       } catch (error) {
//         console.log("Failed to parse localStorage value:", error);
//       }
//     }

//     // If no value is found in localStorage, use the initial value
//     // If the initial value is a function, execute it to get the actual initial value
//     return typeof initValue === "function" ? initValue() : initValue;
//   });

//   // Update localStorage whenever the key or value changes
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };









export default useLocalStorage;








