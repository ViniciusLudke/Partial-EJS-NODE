import pedido from "../pedidoModel.js";


function findAll(req,res){

    pedido.findAll({
        order:['idpedido'],
    }).then((result) => res.json(result));

}

function findOne(req,res){

pedido.findByPk(req.params.id).then((result) => res.json(result));

}


function addOne(req,res){


    pedido.create({
        idcomanda: req.body.idcomanda,
        idproduto: req.body.idproduto,
        vlvenda: req.body.vlvenda
    }).then((result) => res.json(reuslt)).catch((err)=> {
        res.status(400).send(err)
    });

}




async function updateOne(req, res) { 

    await pedido.update( 
  
      { 
  
        idcomanda: req.body.idcomanda,
        idproduto: req.body.idproduto,
        vlvenda: req.body.vlvenda
      }, 
  
      { 
  
        where: { 
  
          idpedido: req.params.id, 
  
        }, 
  
      } 
  
    )
    pedido.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 
  
      res.status(400).send(err.errors[0].message)}); 
  
  } 


async function deleteOne(req,res){

    await pedido.destroy({

        where:{
            idpedido: req.params.id,
        }

    })    
    
    pedido.findAll({
      order:['idpedido'],
    }).then((result) => res.json(result)).catch((err) =>{
        res.status(400).send(err.errors[0].message);
    })

}
export default {findAll,findOne, addOne, updateOne, deleteOne};