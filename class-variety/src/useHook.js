import {useState} from "react"
import {getFirestore} from "firebase/firestore"


function useHook(){
    
    const [price, setPrice] =  useState(0)

    function Product(){
        setPrice(prev => prev + 1)
    }

    function Decrement(){
        setPrice(prev => prev - 1)
    }
    return [price, Product, Decrement]
}

export default useHook