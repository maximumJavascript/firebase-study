import { app, attachRoutes, configureApp } from './server';

// function errorHandler(req: any, res: any, next: () => void) {
//   console.log('Time:', new Date());
//   next();
// }

// app.use(errorHandler);
configureApp();
attachRoutes();

app.listen(3001);
