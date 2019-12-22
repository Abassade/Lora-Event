const ticketController = require('../controllers/ticket');
const ticket = (app)=>{
    
    app.get('/',(req, res) => {
        res.render('index.pug');
    });

    app.post('/paystack/pay', (req, res)=>{
        ticketController.payTicket(req, res);
    });

    app.get('/paystack/callback', (req, res)=>{
        ticketController.redirectPay(req, res);
    });

    app.get('/receipt/:id', (req, res)=>{
        ticketController.verifyTicket(req, res);
    });

    app.get('/error', (req, res)=>{
        res.render('error.pug');
    })
  
}

module.exports = ticket;