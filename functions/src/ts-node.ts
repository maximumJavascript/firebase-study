import cors = require('cors');
import { app, attachRoutes } from './server';

function errorHandler(req: any, res: any, next: () => void) {
  console.log('Time:', new Date());
  next();
}

app.use(errorHandler);
app.use(cors());
attachRoutes();

app.listen(3001);
