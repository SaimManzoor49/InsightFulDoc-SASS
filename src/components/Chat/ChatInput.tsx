'use client'
import React, { useContext, useRef } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import {ChatContext} from './ChatContext'

interface IChatInputProps{
  isDisabled:boolean,
}

const ChatInput = ({isDisabled}:IChatInputProps) => {

  const {addMessage,handleInputChange,isLoading,message} = useContext(ChatContext)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className='absolute bottom-0 left-0 w-full '>
      <form className='mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea 
              ref={textAreaRef}
               rows={1}
                autoFocus 
                onChange={(e)=>{
                  handleInputChange(e)
                  console.log(message+ "<= in input")
                }}
                value={message}
                onKeyDown={(e)=>{
                if(e.key==="Enter"&& !e.shiftKey){
                  e.preventDefault()
                  addMessage()
                  textAreaRef.current?.focus()
                }
              }}  maxRows={4} placeholder='Enter your questions...' className='resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch' />
              <Button  aria-label='send message' className='absolute bottom-1.5 right-[8px]' disabled={isLoading || isDisabled}
              type='submit'
              onClick={(e)=>{
                e.preventDefault()
                addMessage()
                textAreaRef.current?.focus()
              }}
              >
                <Send  className='h-4 w-4'/>
              </Button>

            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChatInput
