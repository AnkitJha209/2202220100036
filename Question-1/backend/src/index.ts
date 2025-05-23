import express, { Application, Request, Response, urlencoded } from 'express'
import { stockRouter } from './routes/stockRoute'
import { fetchToken } from './utils/fetchToken'
import cors from 'cors'
const app : Application = express()
app.use(express.json())
app.use(urlencoded())

app.use(cors())

// Initial token fetch
fetchToken();

// Refresh every 1 minute 50 seconds (safe margin under 2 minutes)
setInterval(fetchToken, 110 * 1000);
app.use('', stockRouter)

app.listen(8080, ()=> {
    console.log("Port is running on 8080")
})