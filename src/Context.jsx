import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [starRating , setStarRating] = useState('')

    return (
        <UserContext.Provider value={{ 
            count, 
            setCount,
            starRating,
            setStarRating
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
