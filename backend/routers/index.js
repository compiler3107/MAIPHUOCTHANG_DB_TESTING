// import adminRouter from "./admin.router";
// import userRouter from "./user.router";
const adminRouter = require('./admin.router')
const userRouter = require('./user.router')
function router(app) {
  app.use('/admin',adminRouter)
  app.use('/',userRouter)


}
module.exports = router;