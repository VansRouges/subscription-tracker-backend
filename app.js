import express from 'express';

import { PORT } from './config/env.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';

const app = express();


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.listen(PORT, 'localhost', async () => {
    console.log(`Subscription Tracker app is running on http://localhost:${PORT}`);

    await connectToDatabase();
    console.log(`Connected to MongoDB`);  
});

export default app;