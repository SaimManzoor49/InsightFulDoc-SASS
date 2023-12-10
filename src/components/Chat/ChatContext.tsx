'use client'
import axios from 'axios'
import React, { ReactNode, createContext, useState } from 'react'
import toast from 'react-hot-toast'


type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => "",
    message: "",
    handleInputChange: () => "",
    isLoading: false
})


const ChatContextProvider =  ({ fileId, children }: { fileId: string, children: ReactNode }) => {

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        const { data } = await axios.post(`/api/message`, { fileId, message })
        setMessage("")
        return data
    }



    const addMessage = () => sendMessage();

    const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setMessage(e.target.value)
        // console.log(e.target.value)
        console.log(message)
    }

    return (
        <ChatContext.Provider value={{ addMessage, handleInputChange, isLoading, message }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider