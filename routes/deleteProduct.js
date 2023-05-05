const express = require('express');
const router = express.Router();
const firebaseConfig = require('../firebase_config/firebaseConfig');
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

const spaceSaver = require('../Schemas/schema').spaceSaverModel;
const bluetoothHeadphone = require('../Schemas/schema').bluetoothHeadphoneModel;
const fashionWallet = require('../Schemas/schema').fashionWalletModel;
const smartWatch = require('../Schemas/schema').smartWatchModel;
const homeAndLiving = require('../Schemas/schema').homeAndLivingModel;
const electronics = require('../Schemas/schema').electronicsModel;
const healthAndBeauty = require('../Schemas/schema').healthAndBeautyModel;
const fashion = require('../Schemas/schema').fashionModel;

router.post('/', async (req, res) => {
    const { products } = await req.body;

    switch(products.category){
        case 'Space Saver':
            await spaceSaver.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Bluetooth Headphone':
            await bluetoothHeadphone.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Fashion Wallet':
            await fashionWallet.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Smart Watch':
            await smartWatch.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Home and Living':
            await homeAndLiving.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Electronics':
            await electronics.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Health and Beauty':
            await healthAndBeauty.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Fashion':
            await fashion.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        default:
            return res.json({ status: 'invalid request' })

    }
})

module.exports = router;

