'use client'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeDetector } from 'react-resize-detector'
import Topbar from './Topbar'
import SimpleBar from 'simplebar-react'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { cn } from '@/lib/utils'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


const PdfRenderer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setcurrPage] = useState(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== scale

  const { width, ref } = useResizeDetector()

  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
      <Topbar
        numPages={numPages as number}
        setcurrPage={setcurrPage}
        currPage={currPage}
        scale={scale}
        setScale={setScale}
        rotation={rotation}
        setRotation={setRotation}
        fileUrl={url}
      />
      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className='max-h-[75vh]' >
          <div className="" ref={ref}>
            <Document
              file={url}
              className={'max-h-full'}
              onLoadError={() => { toast.error("Error while loading PDF") }}
              loading={<div className='flex justify-center'><Loader2 className='my-24 h-6 w-4 animate-spin' /></div>}
              onLoadSuccess={({ numPages }) => { setNumPages(numPages) }}
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
              {isLoading && renderedScale ? <Page
                width={width ? width : 1}
                key={"@"+renderedScale}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
              /> : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className='flex justify-center'><Loader2 className='my-24 h-6 w-6 animate-spin' /></div>
                }
                onRenderSuccess={()=>setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PdfRenderer