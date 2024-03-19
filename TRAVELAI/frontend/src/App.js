import React, { useState,useEffect,useRef } from "react";
import "./App.css";
import CSVTable from './CSVTable';

function App() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]); // To store the conversation history
  const [threadId, setThreadId] = useState(null);
  const [runId, setRunId] = useState(null);
  const [skipFirstUserMessage, setSkipFirstUserMessage] = useState(false); // New state to track if the next user message should be skipped
  const isFirstRender = useRef(true);

  useEffect(() => {

    if (isFirstRender.current || skipFirstUserMessage) {//
      sendMessage('Hello');
      setMessages([]);
      setThreadId(null);
      setRunId(null);
      // Optionally reset skipFirstUserMessage to false after sending the message
      setSkipFirstUserMessage(false);
      isFirstRender.current = false; 
    }
    // This code runs after skipFirstUserMessage has been updated.
    // Here, you can place any code that should run right after the state has been updated.
    // For example, you might want to trigger an API call, update another state, etc.
  }, [skipFirstUserMessage]);

  // Modified sendMessage to accept an optional customMessage parameter
  const sendMessage = (customMessage = userInput) => {
    const requestBody = {
      message: customMessage,
      assistantId: process.env.OPENAI_ASSISTANT_ID,
    };
    // Include threadId and runId in the request if they exist
    if (threadId && runId) {
      requestBody.threadId = threadId;
      requestBody.runId = runId;
    }

    if (!skipFirstUserMessage && !isFirstRender.current){//
    // Proceed to add the message to the conversation history
    setMessages((messages) => [
      ...messages,
      { sender: "User", assistantId: process.env.OPENAI_ASSISTANT_ID,text: customMessage },
    ]);
  }
   
    fetch("/chat1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add server response to the conversation
        setMessages((messages) => [
          ...messages,
          { sender: "Bot",assistantId: process.env.OPENAI_ASSISTANT_ID, text: data.response },
        ]);
        // Update threadId and runId for future requests
        setThreadId(data.threadId);
        setRunId(data.runId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Clear the input field after sending if using userInput
    if (customMessage === userInput) setUserInput("");
    //if(skipFirstUserMessage === true) setSkipFirstUserMessage(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  const refreshAssistant = () => {
    // Reset conversation state before sending the "hello" message
    setMessages([]);
    setThreadId(null);
    setRunId(null);
    // Call sendMessage with 'hello' to start a new conversation
    setSkipFirstUserMessage(true);
    //if(skipFirstUserMessage)
   // {
   // sendMessage('Hello');
  //  }
  };

  return (
    <div className="App">
      <header className="App-header">
                      {/* Refresh button */}
                      <buttonRefresh className="buttonRefresh" onClick={() =>refreshAssistant()}></buttonRefresh>
        <div className="chat-container">
          {messages.map((msg, index) => {
            const isCSVFormat = msg.sender === 'Bot' && msg.text && typeof msg.text === 'string' && msg.text.includes('|---------------|');
            return (
              <div key={index} className={`message ${msg.sender}`}>
                {isCSVFormat ? (
                  <CSVTable dataString={msg.text} />
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            );
          })}
        </div>
        <textarea
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        {/* Send button */}
        <button onClick={() => sendMessage()}></button>
      </header>
    </div>
  );
}

export default App;
