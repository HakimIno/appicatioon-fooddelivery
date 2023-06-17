const { mongoConfig } = require("../config");
const { getCartItems } = require("./cart.service");
const MongoDB = require("./mongodb.service");
const QRCode = require("qrcode");


const createOrder = async ({ username }) => {
  try {
    const orderId = `SE-${Math.floor(Math.random() * 999999) + 1000}-${
      Math.floor(Math.random() * 999999999) + 1000
    }`;

    let cartResponse = await getCartItems({ username });
    let basketItems = Array();

    cartResponse?.data?.cartItems.map(({ _id, count, foodId }) => {
      if (_id) {
        basketItems.push({ _id, foodId, count });
      }
    });

    let itemsTotal = cartResponse?.data?.metaData?.itemsTotal;

    let _createOrder = await MongoDB.db
      .collection(mongoConfig.collections.ORDER)
      .insertOne({
        orderId: orderId,
        username: username,
        items: basketItems,
        orderDate: new Date(),
        orderStatus: "Waiting",
        readyTime: 30,
        price: itemsTotal,
      });
    if (_createOrder?.insertedId) {
      return {
        status: true,
        message: "Order added Successfully",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Item Added to Cart Failed",
    };
  }
};

const getOrder = async ({ username }) => {
  try {
    let orderAll = await MongoDB.db
      .collection(mongoConfig.collections.ORDER)
      .aggregate([
        {
          $match: {
            username: username,
            orderStatus: "Waiting",
          },
        },
      ])
      .toArray();
    if (orderAll?.length > 0) {
      return {
        status: true,
        message: "Order fetched Successfully",
        data: orderAll,
      };
    } else {
      return {
        status: false,
        message: "Order not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Order fetching Failed",
    };
  }
};

const getOrderSuccess = async ({ username }) => {
  try {
    let orderAll = await MongoDB.db
      .collection(mongoConfig.collections.ORDER)
      .aggregate([
        {
          $match: {
            username: username,
            orderStatus: "Success",
          },
        },
      ])
      .toArray();
    if (orderAll?.length > 0) {
      return {
        status: true,
        message: "Order fetched Successfully",
        data: orderAll,
      };
    } else {
      return {
        status: false,
        message: "Order not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Order fetching Failed",
    };
  }
};

const getOneOrderById = async (orderId) => {
  try {
    let orderById = await MongoDB.db
      .collection(mongoConfig.collections.ORDER)
      .findOne({ orderId: orderId });

    if (orderById) {
      return {
        status: true,
        message: "Order found successfully",
        data: orderById,
      };
    } else {
      return {
        status: false,
        message: "No Order foundxxxxxxxx",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Order finding failed",
      error: `Order finding failed : ${error?.message}`,
    };
  }
};



module.exports = { createOrder, getOrder,getOrderSuccess, getOneOrderById };
