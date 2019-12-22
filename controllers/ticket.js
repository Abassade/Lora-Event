const Ticket = require('../models/ticket');
const paystack = require('../config/paystack');
const _ = require('lodash');
const {initializePayment, verifyPayment} = paystack();

class TicketController {

    payTicket(req, res){
        const form = _.pick(req.body,['amount','event','email','full_name']);
        form.metadata = {
            full_name : form.full_name
        }
        form.amount *= 100;
        
        initializePayment(form, (error, body)=>{
            if(error){
                //handle errors
                console.log(error);
                return res.redirect('/error')
            }
            const response = JSON.parse(body);
            console.log('response', response);
            res.redirect(response.data.authorization_url)
        });
    }

    redirectPay(req, res){
        const ref = req.query.reference;
        verifyPayment(ref, (error,body)=>{
            if(error){
                console.log(error)
                return res.redirect('/error');
            }
            const response = JSON.parse(body);
            console.log('response gotten', response);    

            const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name', 'event']);

            const [reference, amount, event, email, full_name] =  data;
            
            const newTicket = {reference, amount, event, email, full_name}

            const ticket = new Ticket(newTicket)

            ticket.save().then((ticket)=>{
                if(!ticket){
                    return res.redirect('/error');
                }
                console.log('from db mongo',ticket);
                res.redirect('/receipt/'+ticket._id);
            }).catch((e)=>{
                console.log(e);
                res.redirect('/error');
            });
        });
    }

    verifyTicket(req, res){
        const id = req.params.id;
        Ticket.findById(id).then((ticket)=>{
            if(!ticket){
                //handle error when the Ticket is not found
                res.redirect('/error')
            }
            res.render('success.pug',{ticket});
        }).catch((e)=>{
            res.redirect('/error')
        });
    }
}

module.exports = new TicketController();