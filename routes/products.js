const express = require('express');
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//models
const spaceSaver = require('../Schemas/schema').spaceSaverModel;
const bluetoothHeadphone = require('../Schemas/schema').bluetoothHeadphoneModel;
const fashionWallet = require('../Schemas/schema').fashionWalletModel;
const smartWatch = require('../Schemas/schema').smartWatchModel;
const homeAndLiving = require('../Schemas/schema').homeAndLivingModel;
const electronics = require('../Schemas/schema').electronicsModel;
const healthAndBeauty = require('../Schemas/schema').healthAndBeautyModel;
const fashion = require('../Schemas/schema').fashionModel;
const featured = require('../Schemas/schema').featuredModel;
const trending = require('../Schemas/schema').trendingModel;
const exclusive = require('../Schemas/schema').exclusiveModel;
const topSeller = require("../Schemas/schema").topSellerModel;
const latest = require('../Schemas/schema').latestModel;


router.get('/', async (req, res) => {
    const product = req.params;

    if (product.hasOwnProperty('productId')){
        const productId = product.productId;
        
        switch(productId) {
            case 'get-products':
                const spaceSaverItem = await spaceSaver.find({});
                const bluetoothHeadphoneItem = await bluetoothHeadphone.find({});
                const fashionWalletItem = await fashionWallet.find({});
                const smartWatchItem = await smartWatch.find({});
                const homeAndLivingItem = await homeAndLiving.find({});
                const electronicsItem = await electronics.find({});
                const healthAndBeautyItem = await healthAndBeauty.find({});
                const fashionItem = await fashion.find({});
                const featuredItem = await featured.find({});
                const trendingItem = await trending.find({});
                const exclusiveItem = await exclusive.find({});
                const topSellerItem = await topSeller.find({});
                const latestItem = await latest.find({});

                const product = { spaceSaverItem, bluetoothHeadphoneItem, fashionWalletItem, smartWatchItem, homeAndLivingItem,
                electronicsItem, healthAndBeautyItem, fashionItem, featuredItem, trendingItem, topSellerItem, exclusiveItem, latestItem };

                return res.json({ status: 'success', data: product });

            default:
                return res.json({ status: 'not found' });
        }
    }
})

module.exports = router;