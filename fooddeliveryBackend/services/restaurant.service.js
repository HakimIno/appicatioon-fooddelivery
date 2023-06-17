const MongoDB = require("./mongodb.service")
const { mongoConfig, tokenSecret } = require('../config')


const getAllRestaurant = async () => {
    try {
        let restaurants = await MongoDB.db
            .collection(mongoConfig.collections.RESTAURANTS)
            .find()
            .toArray();

        if (restaurants && restaurants?.length > 0) {
            return {
                status: true,
                message: "restaurants found successfully",
                data: restaurants
            }
        } else {
            return {
                status: false,
                message: "No restaurants found"
            }
        }

    } catch (error) {
        return {
            status: false,
            message: "Restaurants finding failed",
            error: `Restaurants finding failed  : ${error?.message}`,
        }
    }
}

const getOneRestaurantById = async (restaurantId) => {
    try {
        let restaurant = await MongoDB.db
            .collection(mongoConfig.collections.RESTAURANTS)
            .aggregate([
                {
                    $match: {
                        id: restaurantId,
                    },
                },
                {
                    $lookup: {
                        from: "foods",
                        localField: "id",
                        foreignField: "restaurantId",
                        as: "foods",
                    },
                },
            ]).toArray();

        if (restaurant && restaurant?.length > 0) {
            return {
                status: true,
                message: "restaurants found successfully",
                data: restaurant[0],
            }
        } else {
            return {
                status: false,
                message: "No restaurants foundxxxxxxxx"
            }
        }
    } catch (error) {
        return {
            status: false,
            message: "Restaurant finding failed",
            error: `Restaurant finding failed : ${error?.message}`,
        };
    }
};

module.exports = { getAllRestaurant, getOneRestaurantById }