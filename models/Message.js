const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Message = sequelize.define('Message', {
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'messages',
    createdAt: 'created_at',  
    updatedAt: 'updated_at'
});

Message.associate = (models) => {
    Message.belongsTo(models.User, { as: 'sender' });
    Message.belongsTo(models.User, { as: 'receiver' });
};

module.exports = Message;