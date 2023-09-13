// import router  from('express').Router();
const router = require('express').Router();
// import userController  from('../controllers/user.controller')
const userController = require('../controllers/user.controller');
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

router.post('/dangky',userController.Register);
router.post('/dangnhap',userController.Login);
router.put('/khoa',userController.khoataikhoan);
router.put('/mokhoa',userController.mokhoataikhoan);
router.post('/themmonhoc',userController.themmonhoc);
router.get('/laymonhoc',userController.laymonhoc);
router.post('/themcauhoi',userController.themcauhoi);
router.get('/laythongtincanhan/:id',userController.laythongtincanhan);
router.post('/themmonhocyeuthich',userController.themmonhocyeuthich);

router.get('/laytaikhoan',userController.Findalluser);


module.exports = router;