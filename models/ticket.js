const {mongoose} = require('../config/mongoose');

const ticketSchema = new mongoose.Schema({
    full_name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    event: {
        type: String, 
        required: true,
    },
    ticketId: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number, 
        required: true,
    },
    reference: {
        type: String, 
        required: true
    }
});

const ticket = mongoose.model('Ticket', ticketSchema);

module.exports = ticket;