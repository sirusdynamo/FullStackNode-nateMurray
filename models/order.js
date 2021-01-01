const { isEmail } = require("validator");

const db = require("../db");


function emailSchema({ required = false } = { required: true }) {
    return {
      type: String,
      required: true,
      validate: {
        validator :isEmail,
        message: (props) => `${prop.value} is not a valid Email`,
      },
    }
    
}
const Order = db.model("Order", {
  buyerEmail: emailSchema({ required: true }),
  products: [
    {
      type: String,
      ref: "Product",
      index: true,
      required: true,
    },
  ],
  status: {
    type: String,
    index: true,
    default: "CREATED",
    enum: ["CREATED", "PENDING", "COMPLETED"],
  },
});

async function get(_id) {
    const order = await Order.findById(_id).populate("products").exec();
    return order
}
