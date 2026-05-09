const { pool } = require('../config/db');

// @desc    Get all orders for logged-in customer
// @route   GET /api/orders
exports.getMyOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.order_id, o.order_date, o.order_amount, o.order_status, o.shipping_date,
              c.cart_id, p.product_id, p.product_name, p.brand, p.MRP as product_mrp,
              cat.category_name, oi.quantity, oi.MRP as paid_price,
              pay.paymentMode
       FROM order_table o
       LEFT JOIN cart c ON o.cart_id = c.cart_id
       LEFT JOIN orderitem oi ON o.order_id = oi.order_id
       LEFT JOIN product p ON oi.product_id = p.product_id
       LEFT JOIN category cat ON p.category_id = cat.category_id
       LEFT JOIN payment pay ON o.order_id = pay.order_id
       WHERE o.customer_id = ?
       ORDER BY o.order_date DESC`,
      [req.user.customer_id]
    );

    // Group order items under each order
    const ordersMap = {};
    orders.forEach(row => {
      if (!ordersMap[row.order_id]) {
        ordersMap[row.order_id] = {
          order_id: row.order_id,
          order_date: row.order_date,
          order_amount: row.order_amount,
          order_status: row.order_status,
          shipping_date: row.shipping_date,
          paymentMode: row.paymentMode,
          items: []
        };
      }
      if (row.product_id) {
        ordersMap[row.order_id].items.push({
          product_id: row.product_id,
          product_name: row.product_name,
          brand: row.brand,
          category_name: row.category_name,
          quantity: row.quantity,
          paid_price: row.paid_price
        });
      }
    });

    res.json({
      success: true,
      data: { orders: Object.values(ordersMap) }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};
