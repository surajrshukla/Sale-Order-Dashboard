import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import SO from './models/so';
import { runInNewContext } from 'vm';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/sale_orders', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log('MongoDB connection is Up and High!');
});


router.route('/sale_orders').get((req, res) => {
    SO.find((err, saleOrders) => {
        if (err) {
            console.log(err);
        } else {
            res.json(saleOrders);
        }
    });
});

router.route('/sale_orders/:id').get((req, res) => {
    SO.findById(req.params.id, (err, saleOrder) => {
        if (err) {
            console.log(err);
        } else {
            res.json(saleOrder);
        }
    });
});

router.route('/sale_orders/add').post((req, res) => {
    let so = new SO(req.body);
    so.save().then(so => {
        res.status(200).json({'sale_order': 'Added Successfully!'});
    }).catch(err => {
        res.status(400).send('Failed to create new Sale Order');
    })
    ;
});

router.route('/sale_orders/update/:id').post((req, res)=> {
    SO.findById(req.params.id, (err, saleOrder) => {
        if (!saleOrder) {
            return next(new Error('Could not load Sale Order'));
        } else {
            saleOrder.title = req.body.title;
            saleOrder.customer = req.body.customer;
            saleOrder.salesPerson = req.body.salesPerson;
            saleOrder.total = req.body.total;
            saleOrder.invoiceStatus = req.body.invoiceStatus;
            saleOrder.save().then(saleOrder => {
                res.json('Updated Sale Order!');
            }).catch(err => {
                res.status(400).send('Update Failed');
            });
        }
    });
});

router.route('/sale_orders/delete/:id').get((req, res) => {
    SO.findByIdAndRemove({_id: req.params.id}, (err, saleOrder) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Removed Succesfully");
        }
    });
})
app.use('/', router);

app.get('/', (req, res)=> res.send("Hello World"));
app.listen(4000, () => console.log('Express is running on port 4000'));