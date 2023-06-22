import { useState } from "react"
import MessagesDisplay from "./components/MessagesDisplay"
import CodeDisplay from "./components/CodeDisplay"

interface ChatData {
  role: string,
  content: string,
}

const App = () => {
  const [value, setValue] = useState<string>("")
  const [ chat, setChat ] = useState<ChatData[]>([])

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

      const response = await fetch("http://localhost:8000/completions", options)
      console.log(response)
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

  return (
    <div className="app">
      <MessagesDisplay/>
      <input value={value} onChange={e => setValue(e.target.value)}/> 
      <CodeDisplay/>
      <div className ="button-container">
        <button id="get-query" onClick={getQuery}>Get Query!</button>
        <button id="clear-chat">Clear Chat!</button>
      </div>
    </div>
  )
}

export default App
