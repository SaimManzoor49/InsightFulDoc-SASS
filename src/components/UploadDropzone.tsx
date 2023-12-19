'use client'
import { useUploadThing } from "@/lib/uploadthing"
import { Cloud, File, Loader } from "lucide-react"
import {  useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import Dropzone from "react-dropzone"
import toast from "react-hot-toast"
import { Progress } from "./ui/progress"

interface UploadDropzoneProps{
    setIsOpen:Dispatch<SetStateAction<boolean>>,
    isSubscribed:boolean
}

const UploadDropzone = ({setIsOpen,isSubscribed}:UploadDropzoneProps) => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const { startUpload } = useUploadThing(
        isSubscribed?"proPlanUploader":"freePlanUploader"
    )
    const router= useRouter();


    const startSimulatedProgress = () => {
        setUploadProgress(0)
        const interval = setInterval(() => {
            setUploadProgress((s) => {
                if (s >= 95) {
                    clearInterval(interval)
                    return s;
                }
                return s + 3;
            })
        }, 500)

        return interval
    }



    return (
        <Dropzone multiple={false} onDrop={async (acceptedFile) => {
            setIsUploading(true)
            const progressInterval = startSimulatedProgress()


            const res = await startUpload(acceptedFile)

            if (!res) {
                toast.error("Your PDF is too big upgrade to pro plan.")
                setIsOpen(false)
                return 
            }

            console.log(res)
            
            clearInterval(progressInterval)
            setUploadProgress(100);
            toast.success("File uploaded!")
            router.refresh()
            setIsOpen(false)
           
        }}>
            {
                ({ getInputProps, getRootProps, acceptedFiles }) => (
                    <div className="border h-64 m-4 border-dashed border-gray-300 rounded-lg" {...getRootProps()}>
                        <div className="flex items-center justify-center h-full w-full">
                            <label htmlFor="dropzone-file" className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
                                <div className="flex flex-col items-center justify-center pt-5 pb 6">
                                    <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                    <p className='mb-2 test-sm text-zinc-700'>
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className='text-xs text-zinc-500'>PDF (up to {isSubscribed?"16":"4"}MB)</p>
                                </div>
                                {acceptedFiles && acceptedFiles[0] ? (
                                    <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[0.5px] outline-gray-300 divide-x divide-zinc-200 mt-4">
                                        <div className="px-3 py-2 h-full grid place-items-center">
                                            <File className='h-4 w-4 text-blue-500' />
                                        </div>
                                        <div className="px-3 py-2 h-full text-xs font-medium truncate">{acceptedFiles[0].name}</div>
                                    </div>
                                ) : (
                                    null
                                )}
                                {isUploading ? (
                                    <div className="w-full mt-4 max-w-xs mx-auto">
                                        <Progress value={uploadProgress} className='h-1 w-full bg-zinc-200' />
                                        {uploadProgress === 100 ? (
                                            <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                                                <Loader className='h-3 w-3 animate-spin' />
                                                Redirecting...
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                                {/* <input type='file' id='dropzone-file'   className='hidden' {...getInputProps} /> */}
                            </label>
                        </div>
                    </div>
                )
            }
        </Dropzone>
    )
}
export default UploadDropzone