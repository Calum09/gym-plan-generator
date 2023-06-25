import { useState } from "react"
import MessagesDisplay from "./components/MessagesDisplay"
import CodeDisplay from "./components/CodeDisplay"

interface ChatData {
  role: string,
  content: string,
}

const App = () => {
  const [ chat, setChat ] = useState<ChatData[]>([])
  const [value, setValue] = useState<string>("")

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value 
        })
      }
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data)
      const userMessage = {
        role: "user",
        content: value

      }
      setChat(oldChat => [...oldChat, data, userMessage])
    } catch (error) {
      console.error(error)
    }
  }

  const clearChat = () => {
    setValue("")
    setChat([])
  }

  const filteredUserMessages = chat.filter(message => message.role === "user")
  const lastestResponse = chat.filter(message => message.role === "assistant").pop()

  return (
    <div className="app">
      <MessagesDisplay userMessages ={filteredUserMessages}/>
      <input value={value} onChange={e => setValue(e.target.value)}/> 
      <CodeDisplay text={lastestResponse?.content || ""}/>
      <div className ="button-container">
        <button id="get-query" onClick={getQuery}>Create Gym Plan! 🏋</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat!</button>
      </div>
    </div>
  )
}

export default App
