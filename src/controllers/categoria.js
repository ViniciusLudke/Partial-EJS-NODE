import categoria from "../categoriaModel.js"; 

  

function findAll(req, res) { 

    categoria.findAll({ 

        order: ['idcategoria'], 

    }).then((result) => res.json(result)); 

  } 

   

function findOne(req, res) { 

  categoria.findByPk(req.params.id).then((result) => res.json(result)); //ache pela pk

} 


/*
categoria.findByPk(req.params.id).then(function resposta(resultado){
  return res.json(resultado)
}); //ache pela pk (resultado) => res.json(resultado)   */

function addOne(req, res) { 

  categoria.create({ 

        nmcategoria: req.body.nmcategoria, 

        flsituacao: req.body.flsituacao 

    }).then((result) => res.json(result)).catch((err)=>{ 

      res.status(400).send(err)}); 

} 

   

async function updateOne(req, res) { 

  await categoria.update( 

    { 

      nmcategoria: req.body.nmcategoria, 

      flsituacao: req.body.flsituacao, 

    }, 

    { 

      where: { 

        idcategoria: req.params.id, 

      }, 

    } 

  )

  

  categoria.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 

    res.status(400).send(err.errors[0].message)}); 

} 

   

async function deleteOne(req, res) { 

  await categoria.destroy({ 

    where: { 

      idcategoria: req.params.id, 

    }, 

  }); 

  

  categoria.findAll({order:['idcategoria']}).then((result) => res.json(result)).catch((err)=>{ 

    res.status(400).send(err.errors[0].message)}); 

} 

  

export default { findAll, findOne, addOne, updateOne, deleteOne }; //o que vai retornar'disponivel'

