import { createContext,useState } from "react";


export const TurfContext = createContext(null)

export const TurfProvider = ({children})=>{
    const [turfData,setTurfData] = useState([])

    let contextData = {
        turfData:turfData,
        setTurfData,
    }
    return(
        <TurfContext.Provider value={contextData}>
            {children}
        </TurfContext.Provider>
    )

}