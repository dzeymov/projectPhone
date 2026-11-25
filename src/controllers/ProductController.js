import Product from "../models/Product.js";

class ProductController {

    async GetAll (req , res){
        try{
            
            const products = await Product.find()
            res.status(200).json(products)
            
        }catch(err){
            res.status(404).json("Ошибка при получении товаров: " + err)
        }
    }
  async Create(req, res) {
    try {
      const {brand,model,title,description,price,quantity,storage,color,screen,camera,battery,os,cpu,ram} = req.body;
      const product = await Product.create({brand,model,title,description,price,quantity,storage,color,
        specs: {screen,camera,battery,os,cpu,ram}
      })

      res.status(200).json(product)
    } catch (err) {
        res.status(400).json("Ошибка при создании товара: ", + err)
    }
  }

  async Patch(req,res){
    try {
      const {id} = req.params
      const { brand, model, title, description, price, quantity, storage, color, screen, camera, battery, os, cpu, ram } = req.body;
      const productPatch = await Product.findByIdAndUpdate(id, { brand, model, title, description, price, quantity, storage, color, screen, camera, battery, os, cpu, ram }, {new:true} )
      if (!productPatch) {
        res.status(404).json("Товар не найден")
      }
      res.status(200).json(productPatch)
    } catch (error) {
      res.status(500).json({message:"ошибка при изменении товара: " + error})
    }
  }

  async Delete(req,res){
    try {
      const {id} =  req.params
      const productDelete = await Product.findByIdAndDelete(id)
      if (!productDelete) {
        res.status(404).json({message:"Товар не найден"})
      }
      res.status(200).json({message: "Товар успешно удален"})

    } catch (error) {
      res.status(500).json({message:"ошибка при удалении товара: " + error})

    }
  }
}

export default new ProductController();
