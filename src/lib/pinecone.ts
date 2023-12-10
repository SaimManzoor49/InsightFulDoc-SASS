import { Pinecone } from "@pinecone-database/pinecone";

// import { PineconeClient } from '@pinecone-database/pinecone'

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: 'gcp-starter',
//   })

//   return client
// }
/////////////////
// import {Pinecone} from '@pinecone-database/pinecone'

// export const pinecone = new Pinecone({
//         apiKey:process.env.PINECONE_API_KEY!,
//         environment:"gcp-starter"
//     })

////////////////////

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: "gcp-starter",
});

const pineconeIndex = pinecone.index("insight-ful-docs");
// // to check
// const showData = async () => {
//   const { status } = await pinecone.describeIndex("insight-ful-docs");
//   console.log(status?.ready);
// };

// showData();

export default pineconeIndex;
