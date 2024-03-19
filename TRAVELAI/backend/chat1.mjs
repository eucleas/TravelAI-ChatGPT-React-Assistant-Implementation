import OpenAI from "openai";
import * as dotenv from "dotenv";
import { sleep } from "openai/core";
dotenv.config();

const openai = new OpenAI();

export default async function chat1(req, res) {
  let { message: userInput, threadId, runId } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: "No user input provided." });
  }

  let thread, run;
  try {
    // Check if threadId and runId are provided, otherwise create them
    if (!threadId) {
      // No thread ID provided, create a new thread
      thread = await openai.beta.threads.create();
      console.log("thread created", thread.id);
      threadId = thread.id;
    } else {
      // Use the existing thread ID
      thread = { id: threadId };
      console.log(thread.id);
    }

    console.log("create is starting: ", userInput, thread.id);
    // Create a message within the thread with user input
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userInput,
    });
    console.log("create is done: ", userInput);

    // No run ID provided or no thread ID provided (which means no run ID either), create a new run
    const assistant = await openai.beta.assistants.retrieve(
      process.env.OPENAI_ASSISTANT_ID
    );
    run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      model: "gpt-3.5-turbo",
    });
    console.log("run created", run.id);
    runId = run.id;

   // console.log(runId);
    //console.log(run.id);

    let status = "initial";
    let result;
    console.log(threadId, runId);
    while (threadId && runId && status != "completed") {
      result = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      status = result.status;
      sleep(3000);
    }
    console.log("status", status);
    let botMessage;
    if (status === "completed") {
      botMessage = await openai.beta.threads.messages.list(thread.id, {
        limit: 1,
      });
    }
    // Send the bot's message back to the client along with the thread and run IDs
    const botResponse = botMessage.body.data
      .map((message) => message.content[0].text.value)
      .join("\n");
    res.json({
      response: botResponse,
      threadId: thread.id,
      runId: run.id,
    });
    console.log(botResponse);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Failed to process the request" });
  }
}
