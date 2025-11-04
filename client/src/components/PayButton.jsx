import axios from "axios";

const API = import.meta.env.VITE_API_BASE;
const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function PayButton({ userId, items, address, onSuccess, onFail }) {
  const pay = async () => {
    try {
      // 1) create RP order on backend
      const { data } = await axios.post(`${API}/api/order/razorpay`, {
        userId, items, address
      }, { withCredentials: true });

      if (!data?.success) throw new Error(data?.message || "Create order failed");

      const { key, order, dbOrderId } = data;

      const options = {
        key: key || KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "GreenCart",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          // 2) verify on backend
          const verify = await axios.post(`${API}/api/order/razorpay/verify`, {
            ...response,
            orderId: dbOrderId,
            userId,
          }, { withCredentials: true });
          if (verify.data?.success) onSuccess?.();
          else onFail?.(verify.data?.message || "Verification failed");
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      onFail?.(e.message);
    }
  };

  return <button onClick={pay}>Pay ₹{calcTotal(items)}</button>;
}

// Optional helper
function calcTotal(items) {
  // UI display only (backend real calc karta hai)
  try {
    const sum = items.reduce((acc, it) => acc + (it?.price || 0) * (it?.quantity || 1), 0);
    const withTax = sum + Math.floor(sum * 0.02);
    return (withTax).toFixed(2);
  } catch { return "—"; }
}