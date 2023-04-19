import { app, attachRoutes } from './server';

function errorHandler(req: any, res: any, next: () => void) {
  console.log('Time:', new Date());
  next();
}

app.use(errorHandler);
attachRoutes();

app.listen(3000);
