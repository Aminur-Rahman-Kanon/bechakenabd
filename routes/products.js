const express = require('express');
const { blogModel } = require('../Schemas/schema');
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

                const product = { spaceSaverItem, bluetoothHeadphoneItem, fashionWalletItem, smartWatchItem, homeAndLivingItem,
                electronicsItem, healthAndBeautyItem, fashionItem };

                return res.json({ status: 'success', data: product });

            // case 'initial-display':
            //     const featuredItem = await featured.find({});
            //     const exclusiveItem = await exclusive.find({});
            //     const trendingItem = await trending.find({});
            //     const topSellerItem = await topSeller.find({});
                
            //     res.json({ status: 'success', data:{ featuredItem, exclusiveItem, trendingItem, topSellerItem } });
            //     break;

            // case "Ear Ring":
            //     const earRings = await earRing.find({});
            //     if (!earRings) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: earRings });
            //     break;

            // case "Finger Ring":
            //     const fingerRings = await fingerRing.find({});
            //     if (!fingerRings) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: fingerRings });
            //     break;

            // case "Toe Ring":
            //     const toeRings = await toeRing.find({});
            //     if (!toeRings) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: toeRings });
            //     break;

            // case "Bracelet":
            //     const braceletItem = await bracelet.find({});
            //     if (!braceletItem) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: braceletItem });
            //     break;

            // case "Necklace":
            //     const necklaceItem = await necklace.find({});
            //     if (!necklaceItem) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: necklaceItem });
            //     break;

            // case "Nepali":
            //     const nepaliItem = await nepali.find({});
            //     if (!nepaliItem) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: nepaliItem });
            //     break;

            // case "Combo":
            //     const comboItem = await combo.find({});
            //     if (!comboItem) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: comboItem });
            //     break;

            // case "Other":
            //     const others = await other.find({});
            //     if (!others) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: others });
            //     break;
            
            // case "Featured":
            //     const featuredProducts = await featured.find({});
            //     if (!featuredProducts) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: featuredProducts });
            //     break;

            // case "Trending":
            //     const trendingProducts = await trending.find({});
            //     if (!trendingProducts) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: trendingProducts });
            //     break;

            // case "Top Seller":
            //     const topSellerProducts = await topSeller.find({});
            //     if (!topSellerProducts) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: topSellerProducts });
            //     break;

            // case "Latest":
            //     const latestProducts = await latest.find({});
            //     if (!latestProducts) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: latestProducts });
            //     break;

            // case "Exclusive":
            //     const exclusiveProducts = await exclusive.find({});
            //     const products = await other.find({});
            //     const totalItem = exclusiveProducts.concat(products);
            //     if (!exclusiveProducts || !products) return res.json({ status: 'database error' });
            //     res.json({ status: 'success', data: totalItem });
            //     break;

            default:
                return res.json({ status: 'not found' });
        }
    }
})

module.exports = router;