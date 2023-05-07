const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogModel = require('../Schemas/schema').blogModel;
const firebase = require('firebase/app');
const firebaseConfig = require('../firebase_config/firebaseConfig');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer(multer.memoryStorage());

router.post('/', upload.array('photo'), async (req, res) => {
    const { data } = await req.body;
    const extractedData = await JSON.parse(data);

    const checkBlog = await blogModel.find({ _id: extractedData.id});
    if (!checkBlog) return res.json({ status: 'not found' });

    // if photo uploaded
    const blogImg = [];
    if (req.files.length){
        for (let idx=0; idx<req.files.length; idx++){
            const imgRef = ref(storage, `products/blog/${extractedData.title}${idx+1}.jpg`);
            
            const metaData = {
                contentType: req.files[idx].mimetype
            }
        
            const snapshot = await uploadBytesResumable(imgRef, req.files[idx].buffer, metaData);
            const url = await getDownloadURL(snapshot.ref);
            blogImg.push(url);
        }
    
    
        await blogModel.updateOne({
            _id: extractedData.id
        }, {
            $set: {
                title: extractedData.title,
                date: extractedData.date,
                details: extractedData.details,
                img: blogImg
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
    }
    //no photo uploaded
    else {
        blogModel.updateOne({
            _id: extractedData.id
        }, {
            $set: {
                title: extractedData.title,
                date: extractedData.date,
                details: extractedData.details,
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
    }

})


module.exports = router;
