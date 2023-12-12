'use client'
import { messageType } from '@/types/messageType'
import axios from 'axios'
import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import toast from 'react-hot-toast'


type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
    messages:messageType[],
    setMessages:Dispatch<SetStateAction<messageType[]>>,
    setIsLoading:Dispatch<React.SetStateAction<boolean>>

}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => "",
    message: "",
    handleInputChange: () => "",
    isLoading: false,
    messages:[],
    setMessages:()=>[],
    setIsLoading:()=>{}
})


const ChatContextProvider =  ({ fileId, children }: { fileId: string, children: ReactNode }) => {

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<messageType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
        setIsLoading(true)
        setMessage("")
        const  res  = await axios.post(`/api/message`, { fileId, message })
        res.data
        console.log(res.data+" <- ai res")
        const aiRes:messageType = {
            text:res.data,
            createdAt:new Date(),
            id:`ai-res ${new Date().getTime()}`,
            isUserMessage:false
            
        }
        setMessages(s=>[aiRes,...s])
        setIsLoading(false)
        return res.data
    }



    const addMessage = () => sendMessage();

    const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setMessage(e.target.value)
        // console.log(e.target.value)
        console.log(message)
    }

    return (
        <ChatContext.Provider value={{ addMessage, handleInputChange, isLoading, message ,messages,setMessages,setIsLoading}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider