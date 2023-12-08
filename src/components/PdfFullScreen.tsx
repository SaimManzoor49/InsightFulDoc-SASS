'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Expand, Loader2 } from 'lucide-react'
import SimpleBar from 'simplebar-react'
import { Document, Page } from 'react-pdf'
import toast from 'react-hot-toast'
import { useResizeDetector } from 'react-resize-detector'

interface IPdfFullScreenProps {
    fileUrl: string
}

const PdfFullScreen = ({ fileUrl }: IPdfFullScreenProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [numPages, setNumPages] = useState<number>()

    const { width, ref } = useResizeDetector()

    return (
        <Dialog open={isOpen} onOpenChange={(v) => {
            if (!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button aria-label='fullScreen' variant={'ghost'} className='gap-1.5' >
                    <Expand className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-7xl w-full'>
                <SimpleBar autoHide={false} className='max-h-[80vh] mt-6'>
                {/* <SimpleBar autoHide={false} className='max-h-[cal(100vh-10rem)] mt-6'> */}
                    <div className="" ref={ref}>
                        <Document
                            file={fileUrl}
                            className={'max-h-full'}
                            onLoadError={() => { toast.error("Error while loading PDF") }}
                            loading={<div className='flex justify-center'><Loader2 className='my-24 h-6 w-4 animate-spin' /></div>}
                            onLoadSuccess={({ numPages }) => { setNumPages(numPages) }}
                        >
                            {new Array(numPages).fill(0).map((_, i) => (
                                <Page
                                    key={i}
                                    width={width ? width : 1}
                                    pageNumber={i + 1}

                                />

                            ))}
                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>

    )
}

export default PdfFullScreen