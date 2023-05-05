const express = require('express');
const router = express.Router();
const spaceSaver = require('../Schemas/schema').spaceSaverModel;
const bluetoothHeadphone = require('../Schemas/schema').bluetoothHeadphoneModel;
const fashionWallet = require('../Schemas/schema').fashionWalletModel;
const smartWatch = require('../Schemas/schema').smartWatchModel;
const homeAndLiving = require('../Schemas/schema').homeAndLivingModel;
const electronics = require('../Schemas/schema').electronicsModel;
const healthAndBeauty = require('../Schemas/schema').healthAndBeautyModel;
const fashion = require('../Schemas/schema').fashionModel;
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../firebase_config/firebaseConfig');

const upload = multer({ storage: multer.memoryStorage() })

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

router.post('/', upload.array('photo'), async (req, res) => {
    const data = await JSON.parse(req.body.data);
    const productCategory = data.category.toLowerCase();
    const productName = data.name.toLowerCase();
    
    switch (productCategory) {
        case "space saver":
            const spaceSaverItem = await spaceSaver.find({ name: data.name });
            if (spaceSaverItem.length) return res.json({ status: 'product exist', product: spaceSaverItem });

            if (!req.files.length) return res.json({ status: 'no img found' });
            const spaceSaverImg = [];
            
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => spaceSaverImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = spaceSaverImg;

            await spaceSaver.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "bluetooth headphone":
            //checking if product exist
            const bluetoothHeadphoneItem = bluetoothHeadphone.find({ name: data.name });
            if ((await bluetoothHeadphoneItem).length) return res.json({ status: 'product exist', product: bluetoothHeadphoneItem });
            if (!req.files.length) return res.json({ status: 'no img found' });
            const bluetoothHeadphoneImg = [];
            
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => bluetoothHeadphoneImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = bluetoothHeadphoneImg;
            await bluetoothHeadphone.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "fashion wallet":
            //checking if product exist
            const fashionWalletItem = await comboModel.find({ name: data.name });
            if (fashionWalletItem.length) return res.json({ status: 'product exist' ,  product: fashionWalletItem });

            if (!req.files.length) return res.json({ status: 'no img found' });

            const fashionWalletImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => fashionWalletImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = fashionWalletImg;

            await fashionWallet.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "smart watch":
            //checking if product exist
            const smartWatchItem = await earRingModel.find({ name: data.name });
            if (smartWatchItem.length) return res.json({ status: 'product exist' ,  product: smartWatchItem });

            const smartWatchImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => smartWatchImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = smartWatchImg;
            
            await smartWatch.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "home and living":
            //checking if product exist
            const homeAndLivingItem = await exclusiveModel.find({ name: data.name });
            if (homeAndLivingItem.length) return res.json({ status: 'product exist' ,  product: homeAndLivingItem });

            const homeAndLivingImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => homeAndLivingImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = homeAndLivingImg;

            await homeAndLiving.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "electronics":
            //checking if product exist
            const electronicsItem = await fingerRingModel.find({ name: data.name });
            if (electronicsItem.length) return res.json({ status: 'product exist' ,  product: electronicsItem });

            const electronicsImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => electronicsImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = electronicsImg;

            await electronics.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "health and beauty":
            //checking if product exist
            const healthAndBeautyItem = await latestModel.find({ name: data.name });
            if (healthAndBeautyItem.length) return res.json({ status: 'product exist' ,  product: healthAndBeautyItem });

            const healthAndBeautyImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => healthAndBeautyImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = healthAndBeautyImg;

            await healthAndBeauty.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "fashion":
            //checking if product exist
            const fashionItem = await necklaceModel.find({ name: data.name });
            if (fashionItem.length) return res.json({ status: 'product exist' ,  product: fashionItem });

            const fashionImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => fashionImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = fashionImg;

            await fashion.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        default:
            return res.json({ status: 'invalid request' })
    }
})

module.exports = router;
