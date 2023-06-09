const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './public/views');
app.set('view engine', 'ejs');

//imported route
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/products');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const confirmResetPassword = require('./routes/confirmResetPassword');
const updateProfile = require('./routes/updateProfile');
const updateRedirect = require('./routes/updateRedirect');
const addProducts = require('./routes/addProducts');
const deleteProducts = require('./routes/deleteProduct');
const updateBlog = require('./routes/updateBlog');
const updateProduct = require('./routes/updateProducts');
const addBlogProduct = require('./routes/addBlogRoute');

//routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products/:productId', productsRoute);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password/:id/:token', resetPassword);
app.use('/reset-password/:id/:token', confirmResetPassword);
app.use('/update-profile', updateProfile);
app.use('/redirect-user', updateRedirect);
app.use('/add-products', addProducts);
app.use('/delete-products', deleteProducts);
app.use('/update-blog', updateBlog);
app.use('/update-product', updateProduct);
app.use('/add-blog', addBlogProduct);

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
}

const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})

