import categoriapagamento from "../categoriapagamentoModel.js";


function findAll(req,res){

    categoriapagamento.findAll({

        order:['idcategoriapagamento'],
    }).then((result) => res.json(result));

}


function findOne(req, res){

    categoriapagamento.findByPk(req.params.id).then((result) => res.json(result))

}

function addOne(req, res){

    categoriapagamento.create({

        dscategoriapagamento: req.body.dscategoriapagamento,

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)}); 

}

async function updateOne(req, res){

    await categoriapagamento.update(
        {
        dscategoriapagamento: req.body.dscategoriapagamento   ,
        },
    {
        where:
        {
            idcategoriapagamento: req.params.id,
        },
    }
    )

    categoriapagamento.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 
  
        res.status(400).send(err.errors[0].message)});
}


async function deleteOne(req,res){

    await categoriapagamento.destroy({

        where:{
            idcategoriapagamento: req.params.id
        }

    })

    categoriapagamento.findAll({
        order: ['idcategoriapagamento'],
    }).then((result) => res.json(result)).catch((err) => {

        res.status(400).send(err.errors[0].message)});

}


export default {findAll, findOne, addOne,updateOne, deleteOne};