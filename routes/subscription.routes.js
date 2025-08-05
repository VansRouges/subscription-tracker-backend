import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: `GET subscription with ID ${req.params.id}` }));
subscriptionRouter.post('/', (req, res) => res.send({ title: 'CREATE new subscription' }));
subscriptionRouter.put('/:id', (req, res) => res.send({ title: `UPDATE subscription with ID ${req.params.id}` }));
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: `DELETE subscription with ID ${req.params.id}` }));
subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: `GET subscriptions for user with ID ${req.params.id}` }));
subscriptionRouter.post('/:id/cancel', (req, res) => res.send({ title: `CANCEL subscription with ID ${req.params.id}` }));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: `GET upcoming renewals` }));
export default subscriptionRouter;
