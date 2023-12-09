import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import {OpenAIEmbeddings} from 'langchain/embeddings/openai'
import {PineconeStore} from 'langchain/vectorstores/pinecone'
import pineconeIndex from "@/lib/pinecone";


const f = createUploadthing();
 
 
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        const {getUser} = getKindeServerSession()
        const user = await getUser()

        if(!user||!user.id) throw new Error("Unauthorized")
      return { userId:user.id};
    })
    .onUploadComplete(async ({ metadata, file }) => {

      const addedFile = await db.file.create({
                        data:{
                        key:file.key,
                        name:file.name,
                        userId:metadata.userId,
                        url:`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                        uploadStatus:'PROCESSING'
                    }
                })

        
                try {

                  const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)

                  const blob = await response.blob()
                  const loader = new PDFLoader(blob)

                  const pageLevelDoc = await loader.load()

                  const pagesAmt = pageLevelDoc.length

                  // Vactorized and index entrie document

                  // const pinecone = await getPineconeClient()

                  // const pineconeIndex =pinecone.Index("insight-ful-docs")
                  // const pineconeIndex = pinecone.Index("insight-ful-docs")
                  

                  const embeddings = new OpenAIEmbeddings({
                    openAIApiKey:process.env.OPENAI_API_KEY
                  })

                  await PineconeStore.fromDocuments(pageLevelDoc,embeddings,{
                    pineconeIndex,
                    namespace:addedFile.id
                  })

                  await db.file.update({
                    data:{
                      uploadStatus:"SUCCESS",
                    },
                    where:{
                      id:addedFile.id
                    }
                  })
                  
                } catch (error) {
                  await db.file.update({
                    data:{
                      uploadStatus:"FAILED",
                    },
                    where:{
                      id:addedFile.id
                    }
                  })
                  
                  console.log(error+'-----------------------')

                }


      }),
} satisfies FileRouter;
 4
export type OurFileRouter = typeof ourFileRouter;