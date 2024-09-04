import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../middleware/catchAsyncErrors.js";
import APiFeatures from "../utils/apiFeatures.js";


//create product access only to -- ADMIN 
export const createProduct = asyncHandler( async (req, res, next) => {

    

    try {

        req.body.user = req.user.id ;
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        }); 
    } catch (err) {
        next(err); 
    }
});

export const getAllProducts = asyncHandler(async (req, res) => {

    const resultPerPage = 5 ; 
    const productCount = await Product.countDocuments() ; 
    
    const apiFeature = new APiFeatures(Product.find() , req.query).search().filter().pagination(resultPerPage);

    const allProducts = await apiFeature.query;
    res.status(200).json({ 
        sucess: true , 
        allProducts 
    });
});

//Update product details -- ADMIN 

export const updateProdct = asyncHandler(async ( req , res , next) =>{
    let product = Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));  // Forward error to middleware
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new: true , 
        runValidators: true , 
        useFindAndModify: false 
    }); 

    res.status(200).json({
        success: true ,
        product 

    })
});

export const deleteProduct = asyncHandler(async (req , res , next ) =>{
    let product = Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));  // Forward error to middleware
    }

    await product.deleteOne() ; 

    res.status(200).json({
        sucess: true , 
        message: "product deleted successfully  "
    })
});


export const getProductDetails = asyncHandler(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));  // Forward error to middleware
        }

        res.status(200).json({
            success: true,
            product , 
            productCount , 
        });
    } catch (error) {
        next(error);  // Pass unexpected errors to the error-handling middleware
    }
});