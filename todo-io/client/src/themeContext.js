import React, {useState} from "react"

const ThemeContext = React.createContext()

const ThemeContextProvider = ({children}) => {
    const [iterate, setIterate] = useState(0)

    function addNumber(){
        setIterate(prev => prev + 10)
    }

  return(
    <ThemeContext.Provider value={{iterate, addNumber}}>
        {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextProvider, ThemeContext}