import order from "../models/Orders.js";
import Customer from "../models/Customers.js";  

const getOrder = async (req, res) => {
    try {
        const orders = await order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const { customerId, amount, orderDate } = req.body;

        const neworder = await order.create(req.body);
        await Customer.findByIdAndUpdate(customerId, {
            $inc: { totalSpend: amount, visits: 1 },
            $set: { lastVisit: orderDate }
        });

        res.json(neworder);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export default { getOrder, createOrder };
