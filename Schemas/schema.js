const mongoose = require('mongoose');

const registerSchema = {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    imgLink: String,
    password: {type: String, required: true},
    state: String,
    city: String,
    address: String,
    zipcode: String,
    thana: String,
}

const products = {
    category: String,
    name: String,
    rating: Number,
    quantity: Number,
    impression: Number,
    price: String,
    img: Array,
    details: String
}

const blog = {
    category: String,
    img: String,
    title: String,
    date: String,
    details: String,
}

const registerModel = mongoose.model('registeredUser', registerSchema);
const spaceSaverModel = mongoose.model('space-saver', products);
const bluetoothHeadphoneModel = mongoose.model('bluetooth-headphones', products);
const fashionWalletModel = mongoose.model('fashion-wallet', products);
const smartWatchModel = mongoose.model('smart-watch', products);
const homeAndLivingModel = mongoose.model('home-and-living', products);
const electronicsModel = mongoose.model('electronics', products);
const healthAndBeautyModel = mongoose.model('health-and-beauty', products);
const fashionModel = mongoose.model('fashion', products);
const featuredModel = mongoose.model('featured', products);
const trendingModel = mongoose.model('trending', products);
const exclusiveModel = mongoose.model('exclusive', products);
const topSellerModel = mongoose.model('topSeller', products);
const latestModel = mongoose.model('latest', products);

module.exports = {
    registerModel,
    spaceSaverModel,
    bluetoothHeadphoneModel,
    fashionWalletModel,
    smartWatchModel,
    homeAndLivingModel,
    electronicsModel,
    healthAndBeautyModel,
    fashionModel,
    featuredModel,
    trendingModel,
    exclusiveModel,
    topSellerModel,
    latestModel
}