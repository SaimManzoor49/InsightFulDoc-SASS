'use client'
import axios from 'axios'
import { Loader2, MessageSquare } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Message from './Message'
import { messageType } from '@/types/messageType'
import { ChatContext } from './ChatContext'



const Messages = ({ fileId }: { fileId: string }) => {
  // const [messages, setMessages] = useState<messageType[]>([])
  const [cursor, setCursor] = useState<string | undefined>()
  // const [isLoading,setIsLoading] = useState(true)

  const {messages,setMessages,setIsLoading,isLoading} = useContext(ChatContext)

  

  const getMessages = async (fileId: string, cursor?: string/*/////////*/) => {
    const { data } = await axios.post(`/api/messages`, { fileId })
    const { messages, nextCursor } = data
    setMessages((s:messageType[]) => [...messages])
    setCursor(nextCursor)
    // setIsLoading(false)
    setIsLoading(false)
    return messages
  }

  useEffect(() => {
    getMessages(fileId)
  }, [])

  const loadingMessage:messageType = {
    createdAt:new Date().toISOString(),
    id:'loading-message',
    isUserMessage:false,
    text:(
      <span className='flex h-full items-center justify-center'><Loader2 className='h-4 w-4 animate-spin'/></span>
    )
  }

  const combinedMessages:messageType[] = [
    ...(isLoading?[loadingMessage]:[]),
    ...(messages??[])
  ]

  return (
    <div className='flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
      {combinedMessages && combinedMessages.length>0 ? (

        combinedMessages.map((message,i)=>{

          const isNextMessageSamePerson = combinedMessages[i-1]?.isUserMessage === combinedMessages[i]?.isUserMessage

          if(i===combinedMessages.length - 1){
            return <Message isNextMessageSamePerson={isNextMessageSamePerson} message={message} key={message.id} />
          }else{
            return <Message isNextMessageSamePerson={isNextMessageSamePerson} message={message} key={message.id} />
          }
        })

      ) : isLoading ? (<div className='w-full flex flex-col gap-2'>
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} />
      </div>)
      :
      (<div className='flex-1 flex flex-col items-center justify-center gap-2'>
        <MessageSquare className='h-8 w-8 text-blue-500' />
        <h3 className="font-semibold text-xl">You&apos;re all set!</h3>
        <p className="text-zinc-500 text-sm">
          Ask your first question to get started.
        </p>
      </div>)}
    </div>
  )
}

export default Messages