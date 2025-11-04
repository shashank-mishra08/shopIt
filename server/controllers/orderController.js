import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// --- Razorpay client ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------------- COD ----------------------
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate Amount Using Items (from DB to avoid tampering)
    let amount = 0;
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) return res.json({ success: false, message: "Product not found" });
      amount += product.offerPrice * it.quantity;
    }
    // Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,          // INR
      address,
      paymentType: "COD",
      isPaid: false,
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// --------------- Razorpay: Create Order ----------------
// POST /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate amount (INR)
    let amount = 0;
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) return res.json({ success: false, message: "Product not found" });
      amount += product.offerPrice * it.quantity;
    }
    // Add 2% tax (same as before)
    amount += Math.floor(amount * 0.02);

    // Create order in our DB first
    const order = await Order.create({
      userId,
      items,
      amount,          // store INR value as per your old logic
      address,
      paymentType: "Online",
      isPaid: false,
    });

    // Razorpay needs paise
    const amountPaise = amount * 100;

    // Create Razorpay order
    const rpOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: order._id.toString(), // helps mapping later
      notes: {
        orderId: order._id.toString(),
        userId,
      },
    });

    // Return details to open checkout on frontend
    return res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order: rpOrder,                 // has id, amount, currency, status...
      dbOrderId: order._id.toString() // for verify call
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// --------------- Razorpay: Verify Payment --------------
// POST /api/order/razorpay/verify
export const verifyPaymentRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // our DB order id (send from frontend)
      userId,  // for clearing cart
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid signature" });
    }

    // Mark paid + clear cart (same behaviour as your Stripe success)
    await Order.findByIdAndUpdate(orderId, { isPaid: true });
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

// --------------- Razorpay: Webhook (optional) ----------
// POST /razorpay  (mounted with raw body in server.js)
export const razorpayWebhooks = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (signature !== expected) return res.sendStatus(400);

    const event = JSON.parse(req.body.toString());

    // You can act on events here if you want redundancy
    // e.g., if (event.event === "payment.captured") { ... }

    return res.sendStatus(200);
  } catch (e) {
    console.error("Razorpay webhook error:", e);
    return res.sendStatus(500);
  }
};

// ---------------------- Queries ------------------------
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};