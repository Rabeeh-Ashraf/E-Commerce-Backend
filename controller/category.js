const schema =require("../model/productschema")
const category = async(req,res)=>{
    try {
        //taking query from category
        const {category} = req.query;
        const filter = {};
                if(category){
            filter.category = category
        }
        const products =await schema.find(filter)
        //condition when it is empty
        if(products.length == [0]){
            return res.status(400).json({
                message  : "products not found  "
            })
        }
        //when success
        return res.status(200).json({
            message : "categories defined shown below",
            products,
        })
    } catch (error) {
        res.status(400).json({
            message : "error"
        })
    }
}
module.exports = category