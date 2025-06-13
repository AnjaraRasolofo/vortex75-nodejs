const { DataTypes } = require("sequelize");
const sequelize = require('../config/database'); 

const Product = sequelize.define('Product', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false,
        toDefaultValue: 0
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
},{
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'products'
});

module.exports = Product;
