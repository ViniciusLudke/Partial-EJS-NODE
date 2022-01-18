import comanda from "../comandaModel.js";


function findAll(req, res) { 

    comanda.findAll({ 

        order: ['idcomanda'], 

    }).then((result) => res.json(result)); 

  };



  function findOne(req,res){

    comanda.findByPk(req.params.id).then((result) => res.json(result));

}

function addOne(req,res){

    comanda.create({

        idgarcom: req.body.idgarcom,
        flcomanda: req.body.flcomanda,
        dhcomanda: req.body.dhcomanda,
        desccomanda: req.body.desccomanda,

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)}); 

}

async function updateOne(req,res){

    await comanda.update({

        idgarcom: req.body.idgarcom,
        flcomanda: req.body.flcomanda,
        dhcomanda: req.body.dhcomanda,
        desccomanda: req.body.desccomanda,
    },
    {
        where:{
            idcomanda: req.params.id
        },
    }
    ) 

    comanda.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err.errors[0].message)}); 

}


async function deleteOne(req,res){
    await comanda.destroy({
        where:{
            idcomanda: req.params.id,
        },
    });

    comanda.findAll({
        order: ['idcomanda'],
    }).then((result) => res.json(result)).catch((err) => {

        res.status(400).send(err.errors[0].message)});

}


export default {findAll,findOne,addOne, updateOne, deleteOne};




