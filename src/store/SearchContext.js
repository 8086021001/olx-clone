import { createContext, useState } from "react";

export const searchContext = createContext(null)

function SearchCont ({children}){
    const [SearchDetails , setSearchDetails] = useState()

    return(
        <searchContext.Provider value={{SearchDetails,setSearchDetails}}>
         {children}
        </searchContext.Provider>
    )
}

export default SearchCont