'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import UploadDropzone from './UploadDropzone'


const UploadButton = ({isSubscribed}:{isSubscribed:boolean}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)


    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if (!v) {
                setIsOpen(v);
            }
        }}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)} >
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <UploadDropzone setIsOpen={setIsOpen} isSubscribed={isSubscribed} />
            </DialogContent>

        </Dialog>
    )
}



export default UploadButton