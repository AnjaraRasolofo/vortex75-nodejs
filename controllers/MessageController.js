const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

exports.send = async (req, res) => {
    
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content) {
        return res.status(400).json({ message: 'Données incomplètes.' });
    }

    try {
        const message = await Message.create({
            sender_id: req.user.id, 
            receiver_id,
            content,
        });

        res.status(201).json({
            message: {
                content: message.content,
            },
            sent_at: moment(message.createdAt).format('HH:mm'),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur lors de l'envoi du message." });
    }

}




    