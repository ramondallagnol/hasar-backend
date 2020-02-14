const Brand = require('../models/Brand');

module.exports = {
    async store(req, res){
      const { description } = req.body;
      const brand = await Brand.create({description});

      return res.json(brand);
    },
    async index(req, res){
      const brands = await Brand.findAll();
      return res.json( brands );
    },
    async delete(req, res) {
      const { brand_id } = req.params;
  
      const brand = await Brand.findByPk(brand_id);
  
      if (!brand) {
        return res.status(400).json({ error: 'Brand not found' });
      }
  
      await brand.destroy();

      return res.json({data: 'Brand has been removed'});
    },
    async update (req, res) {
      try {
        console.log(res)
        const brand= await Brand.findByPk(req.params.brand_id);

        await brand.update(req.body);
  
        return res.json({ brand });
      } catch (error) {
        return res.status(400).json({ error: err.message });
      }
    }
};