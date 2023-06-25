import express, { Application, Request, Response} from "express"
import cors from "cors"
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from "dotenv"
dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())

const API_KEY = process.env.API_KEY
const PORT: number = 8000

const configuration = new Configuration({
    apiKey: API_KEY,
})

const openai = new OpenAIApi(configuration)

// ------ ROUTES ------

app.post('/completions', async (req: Request, res: Response) => {
   try {
      const completion = await openai.createChatCompletion({
        model : "gpt-3.5-turbo",
        temperature : 0.8,
        max_tokens : 2000,
        messages : [
          {"role": "system", "content": "You are a personal training who creates gym plans."},
          {"role": "user", "content": "Turn into a gym plan: " + req.body.message}
        ]
      
    })
       res.send(completion.data.choices[0].message)

   } catch (error) {
       console.error(error)
       res.status(500).send("Server error")
   }
})



app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))