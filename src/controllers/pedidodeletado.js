import pedidodeletado from "../pedidodeletadoModel.js";



function findAll(req,res){

    pedidodeletado.findAll({
        order:['idpedidodeletado'],
    }).then((result) => res.json(result)).catch((err)=> {
        res.status(400).send(err)
    });

}


function findOne(req,res){

    pedidodeletado.findByPk(req.params.id).then((result) => res.json(result));
    
    }
    
    
    function addOne(req,res){
    
    
        pedidodeletado.create({
            idcomanda: req.body.idcomanda,
            idproduto: req.body.idproduto,
            vlvenda: req.body.vlvenda
        }).then((result) => res.json(result)).catch((err)=> {
            res.status(400).send(err)
        });
    
    }
    
    
    
    
    async function updateOne(req, res) { 
    
        await pedidodeletado.update( 
      
          { 
      
            idcomanda: req.body.idcomanda,
            idproduto: req.body.idproduto,
            vlvenda: req.body.vlvenda
          }, 
      
          { 
      
            where: { 
      
              idpedidodeletado: req.params.id, 
      
            }, 
      
          } 
      
        )
        pedidodeletado.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 
      
          res.status(400).send(err.errors[0].message)}); 
      
      } 
    
    
    async function deleteOne(req,res){
    
        await pedidodeletado.destroy({
    
            where:{
                idpedidodeletado: req.params.id,
            }
    
        })    
        
        pedidodeletado.findAll({
          order:['idpedido'],
        }).then((result) => res.json(result)).catch((err) =>{
            res.status(400).send(err.errors[0].message);
        })

    }

export default {findAll, findOne, addOne, updateOne, deleteOne};