const express = require('express');

const data_artwork_retrieval_controller = require('../controllers/data_artwork_retrieval_controller')

const router = express.Router();

router.get('/getData', data_artwork_retrieval_controller.getData);
router.get('/getUserRatings/:userId&:tourApproach', data_artwork_retrieval_controller.getUserRatings);
router.post('/updateData', data_artwork_retrieval_controller.updateData);
router.delete('/deleteData', data_artwork_retrieval_controller.deleteData);
router.post('/putData', data_artwork_retrieval_controller.putData);

module.exports = router