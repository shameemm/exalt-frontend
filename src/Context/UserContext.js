import {createContext, useState,useEffect} from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({children})=>{
    const [tokens,setTokens] = useState()
    useEffect(() => {
        setTokens(()=>localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null)
    }, [])
    

    let contextData = {
        token : tokens,
        setTokens,
    }
    return(
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}