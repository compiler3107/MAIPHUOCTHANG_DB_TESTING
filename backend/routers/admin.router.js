// import router  from('express').Router();
const router = require('express').Router();
// import adminController  from('../controllers/admin.controller')

const adminController = require('../controllers/admin.controller');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'image/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = router;