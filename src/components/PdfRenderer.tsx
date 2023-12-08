'use client'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Topbar from './Topbar'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


const PdfRenderer = ({ url }: { url: string }) => {
const [numPages, setNumPages] = useState<number>()
const [currPage, setcurrPage] = useState(1)

  const { width, ref } = useResizeDetector()

  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Topbar numPages={numPages as number} setcurrPage={setcurrPage} currPage={currPage} />
        </div>
      </div>
      <div className="flex-1 w-full max-h-screen">
        <div className="" ref={ref}>
          <Document
            file={url}
            className={'max-h-full'}
            onLoadError={() => { toast.error("Error while loading PDF") }}
            loading={<div className='flex justify-center'><Loader2 className='my-24 h-6 w-4 animate-spin' /></div>}
            onLoadSuccess={({numPages})=>{setNumPages(numPages)}}
          >
            {/* {width ?
              (
                <Page
                  // width={width}
                  pageNumber={1}
                />
                ) : (
                  <Page
                  pageNumber={1}
                  />
              )
            } */}
            <Page
              width={width?width:1}
              pageNumber={currPage}
            />
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfRenderer