module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("car", {
        brand: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        licensePlate: {
            type: Sequelize.STRING,
            unique: true
        },
        color: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        mileage: {
            type: Sequelize.INTEGER
        }
    });

    return Car;
};