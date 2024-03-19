import OpenAI from "openai";
import * as dotenv from "dotenv";
import { sleep } from "openai/core";
dotenv.config()

const openai = new OpenAI();

const assistant= await openai.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID);


//Create Thread
 const thread = await openai.beta.threads.create();

//Create Message
const message = await openai.beta.threads.messages.create(thread.id,{
  role:"user",
  content:"I would like to go Toronto from Berlin in April. can you show me the available flight for only April please?"
});

//Run Assistant
const run = await openai.beta.threads.runs.create(thread.id,{
  assistant_id: assistant.id,
  model: "gpt-3.5-turbo"
});

console.log(run.id);
//Retrieve message from the assistant
let status = 'initial'
let result 
while( status !== 'completed' ) {
  result = await openai.beta.threads.runs.retrieve(thread.id,run.id);
  status = result.status
  sleep(5000)
}

const messages = await openai.beta.threads.messages.list(thread.id, {
  limit: 2
});
messages.body.data.forEach(message => {
  console.log(`${message.role}: ${message.content[0].text.value}`)
})

//Retrieve reply from the assistant
// const run = await openai.beta.threads.runs.retrieve("thread_yDSiOxNpn7R5C2ZvrHIhT21D","run_YNmBRBEDJu3Nzv8Ni5KZJF2g");
// console.log(run);


// messages.body.data.forEach(message => {
//   console.log(message.content)
  
// });

