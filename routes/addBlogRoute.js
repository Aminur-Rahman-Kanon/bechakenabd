const express = require('express');
const router = express.Router();
const blogModel = require('../Schemas/schema').blogModel;
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const firebsae_config = require('../firebase_config/firebaseConfig');

firebase.initializeApp(firebsae_config);
const storage = getStorage();

const upload = multer({storage: multer.memoryStorage()});

router.post('/', upload.array('photo'), async (req, res) => {
    const { data } = await req.body;
    const extractedData = JSON.parse(data);

    const checkBlog = await blogModel.find({
        title: extractedData.title
    });

    if (checkBlog.length) return res.json({ status: 'product exist', product: checkBlog });

    const blogImg = [];
    for (let i=0; i<req.files.length; i++) {
        const imgRef = ref(storage, `products/blog/${extractedData.title}/${extractedData.title}${i+1}.jpg`);

        const metaData = {
            contentType: req.files[i].mimetype
        }

        const snapshot = await uploadBytesResumable(imgRef, req.files[i].buffer, metaData);

        const url = await getDownloadURL(snapshot.ref);
        blogImg.push(url);
    }

    await blogModel.create({
        category: extractedData.category,
        title: extractedData.title,
        date: extractedData.date,
        details: extractedData.details,
        img: blogImg
    }).then(response => res.json({ status: 'success' })).catch(err => res.json({ status: 'error' }))
})


module.exports = router;
