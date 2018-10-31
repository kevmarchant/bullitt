import { Application } from './src/web';
import controllers from './src/app/controllers';

const app = new Application();
app.start(controllers);
