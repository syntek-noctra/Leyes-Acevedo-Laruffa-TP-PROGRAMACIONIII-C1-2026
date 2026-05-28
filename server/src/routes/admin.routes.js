const {createAdmin,findAdmins}=require("../controllers/admin.controller")

const adminRouter=require("express").Router();

adminRouter.get("/",findAdmins)

adminRouter.post("/",createAdmin)


module.exports=adminRouter;