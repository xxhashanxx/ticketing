import express, { Request, Response } from 'express';
import {
  NotFoundError,
} from '@bitizifytickets/common';
import { Order } from '../models/order';

import { requireAuth} from '../common/middlewares/require-auth';
import { NotAuthorizedError} from '../common/errors/not-authorized-error';
const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
