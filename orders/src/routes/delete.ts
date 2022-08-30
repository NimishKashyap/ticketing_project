import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@nimishkashyap031/common";
import { Order, OrderStatus } from "../models/order";
const router = express.Router();

// DO NOT ACTUALLY DELETE BUT CHANGE STATUS TO CANCELLED
router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishes an event saying order is cancelled

    res.status(204).send({});
  }
);

export { router as deleteOrderRouter };
