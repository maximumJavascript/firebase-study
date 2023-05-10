import * as cors from 'cors';
import { app, attachRoutes } from './server';
import { json } from 'express';
// function errorHandler(req: any, res: any, next: () => void) {
//   console.log('Time:', new Date());
//   next();
// }

// app.use(errorHandler);
app.use(json());
app.use(
  cors({
    origin: '*',
  })
);

attachRoutes();

app.listen(3001);
