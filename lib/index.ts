import express, { Express,Request,Response,NextFunction } from 'express'
import error_api from './router/firepower.js'

const app:Express = express()
const port = 911

global.cache = new Map()

// Middleware
app.use((request: Request, response: Response, next: NextFunction) => {
  // CORS
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use('/call', error_api)

app.get('/', ((request: Request, response: Response) => {
  response.status(200)
  response.send({
    code: 200,
    result: {
      message: `Message Code`,
    },
  });
}))

app.use((request: Request, response: Response) => {
  response.type('text/plain');
  response.status(404)
  response.send('Page is not found.');
})

app.listen( port, () => {
  console.log(`server is running on :${port}:`)
})
