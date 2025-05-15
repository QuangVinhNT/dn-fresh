import cors from 'cors'
import express, { Application } from 'express'
import dotenv from 'dotenv'
import { checkConnect } from "./configs/database.js";
import router from "./routes/index.js";
import generateUUID from "./utils/generateUUID.js";

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

checkConnect();
app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is starting at: http://localhost:${port}`)
})
