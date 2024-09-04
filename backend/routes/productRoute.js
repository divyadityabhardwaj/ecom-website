import { getAllProducts , createProduct, updateProdct, deleteProduct, getProductDetails} from "../controllers/productController.js";
import express from "express" ; 
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router() ; 

router.route("/products").get(isAuthenticatedUser , authorizeRoles("admin"), getAllProducts);
router.route("/product/new").post(isAuthenticatedUser , authorizeRoles("admin") , createProduct);
router.route("/product/:id").put(isAuthenticatedUser,updateProdct).delete(isAuthenticatedUser,deleteProduct)
router.route("/productDetails/:id").get(isAuthenticatedUser,getProductDetails);

export default router ; 