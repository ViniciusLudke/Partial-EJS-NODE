import detalhepagamento from "../detalhepagamentoModel.js";


function findAll(req, res){

    detalhepagamento.findAll({
        order:['idpagamento'],
    }).then((result) => res.json(result));


}


function findOne(req,res){

    detalhepagamento.findByPk(req.params.id).then((result) => res.json(result));

}

function addOne(req,res){

    detalhepagamento.create({

        idcomanda: req.body.idcomanda,
        idcategoriapagamento: req.body.idcategoriapagamento,
        vlpago: req.body.vlpago

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)}); 

}

async function updateOne(req,res){

    await detalhepagamento.update({

        idcomanda: req.body.idcomanda,
        idcategoriapagamento: req.body.idcategoriapagamento,
        vlpago: req.body.vlpago
    },
    {
        where:{
            idpagamento: req.params.id
        },
    }
    ) 

    detalhepagamento.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err.errors[0].message)}); 

}


async function deleteOne(req,res){
    await detalhepagamento.destroy({
        where:{
            idpagamento: req.params.id,
        },
    });

    detalhepagamento.findAll({
        order: ['idcomanda'],
    }).then((result) => res.json(result)).catch((err) => {

        res.status(400).send(err.errors[0].message)});

}


export default {findAll, findOne, addOne, updateOne, deleteOne};