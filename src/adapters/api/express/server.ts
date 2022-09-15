import express, { Express } from 'express';
import userRouter from './routes/user.routes';

export class ExpressServer {
  private appPort: number;
  private app: Express = express();

  constructor(port: number) {
    this.appPort = port;
  }

  async server() {
    this.app.use(express.json());
    this.app.use('/', userRouter);

    this.app.listen(this.appPort, () =>
      console.log(`Server is running at: http://localhost:${this.appPort}`),
    );
  }
}
