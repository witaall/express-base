import 'dotenv/config';
require('express-async-errors');
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { mergeJsonFiles } from './api-docs';
import morgan from 'morgan';

// routes
import authenticateUser from './routes/auth';
// error handler
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

const app = express();

app.use(express.json());

app.use(morgan('combined'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(mergeJsonFiles('docs')));
app.use('/auth', authenticateUser);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) throw new Error('Mongo URI must be defined');

    await mongoose.connect(mongoUri);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();