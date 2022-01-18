 
import express from "express"; 

import categoria from "./src/controllers/categoria.js"; 
import garcom from "./src/controllers/garcom.js"; 
import produto from "./src/controllers/produto.js";
import pedido from "./src/controllers/pedido.js";
import categoriapagamento from "./src/controllers/categoriapagamento.js";
import comanda from "./src/controllers/comanda.js";
import detalhepagamento from "./src/controllers/detalhepagamento.js";
import pedidodeletado from "./src/controllers/pedidodeletado.js";
import consultas from "./src/consultas.js";


import Garcom from "./src/garcomModel.js";

const routes = express.Router(); 

//const handlebars = require('express-handlebars');


routes.get('/', (req, res)=>{ 

  res.render("index");

}) 

routes.get("/categoria", categoria.findAll); 

routes.get("/categoria/:id", categoria.findOne); 

routes.post("/categoria", categoria.addOne); 

routes.put("/categoria/:id", categoria.updateOne); 

routes.delete("/categoria/:id", categoria.deleteOne); 


routes.get("/garcom",garcom.findAll);

routes.get("/garcom/:id", garcom.findOne);

routes.post("/garcom", garcom.addOne);

routes.put("/garcom/:id", garcom.updateOne);

routes.delete("/garcom/:id", garcom.deleteOne);


routes.get("/produto", produto.findAll);

routes.get("/produto/:id", produto.findOne);

routes.post("/produto", produto.addOne);

routes.put("/produto/:id", produto.updateOne);

routes.delete("/produto/:id", produto.deleteOne);


routes.get("/pedido", pedido.findAll);

routes.get("/pedido/:id", pedido.findOne);

routes.post("/pedido", pedido.addOne);

routes.put("/pedido/:id", pedido.updateOne);

routes.delete("/pedido/:id", pedido.deleteOne);


routes.get("/comanda", comanda.findAll);

routes.get("/comanda/:id", comanda.findOne);

routes.post("/comanda", comanda.addOne);

routes.put("/comanda/:id", comanda.updateOne);

routes.delete("/comanda/:id", comanda.deleteOne);



routes.get("/categoriapagamento", categoriapagamento.findAll);

routes.get("/categoriapagamento/:id", categoriapagamento.findOne);

routes.post("/categoriapagamento", categoriapagamento.addOne);

routes.put("/categoriapagamento/:id", categoriapagamento.updateOne);

routes.delete("/categoriapagamento/:id", categoriapagamento.deleteOne);


routes.get("/detalhepagamento", detalhepagamento.findAll);

routes.get("/detalhepagamento/:id", detalhepagamento.findOne);

routes.post("/detalhepagamento", detalhepagamento.addOne);

routes.put("/detalhepagamento/:id", detalhepagamento.updateOne);

routes.delete("/detalhepagamento/:id", detalhepagamento.deleteOne);



routes.get("/pedidodeletado", pedidodeletado.findAll);

routes.get("/pedidodeletado/:id", pedidodeletado.findOne);

routes.post("/pedidodeletado", pedidodeletado.addOne);

routes.put("/pedidodeletado/:id", pedidodeletado.updateOne);

routes.delete("/pedidodeletado/:id", pedidodeletado.deleteOne);


routes.get("/query1", consultas.query1);

routes.get("/query2/:id", consultas.query2);

routes.get("/query3", consultas.query3);

routes.get("/query4/:id", consultas.query4);

routes.get("/query5/:id", consultas.query5);

routes.get("/query6/:id", consultas.query6);

routes.get("/query7", consultas.query7);

routes.get("/query8", consultas.query8);

routes.get("/query9", consultas.query9);

routes.get("/query10", consultas.query10);

routes.get("/query11", consultas.query11);

routes.get("/query13", consultas.query13);

routes.get("/query14", consultas.query14);

routes.get("/query15", consultas.query15);

routes.get("/query16", consultas.query16);

routes.get("/query17/:id", consultas.query17);

routes.get("/query18", consultas.query18);

routes.get("/query19/:id", consultas.query19);

routes.get("/transactions/:id", consultas.transactions);

routes.get("/teste", function(req,res){

  res.send('funcionando, bv usuario: ' + req.body.nome);
});


routes.get("/",(req,res)=>{

  res.render("index");

})

routes.get("/addgarcom",(req,res)=>{
  Garcom.findAll({raw:true, order:['idgarcom'], where:{flgarcom: 0}}).then(resposta =>{
    res.render("garcom",{
      garcoms : resposta
    });
  });

})

routes.post("/newgarcom", (req,res)=>{

  Garcom.create({
    nmgarcom : req.body.nmgarcom
  }).then(() =>{
    res.send("garcom adicionado, nome: " +  req.body.nmgarcom);
  })
})
//o que acontece aqui eh q ele n deixa eu excluir pois ele eh fk de outra table
//então eu irei apenas editar e deixar ele como 1

routes.get("/altergarcom/:nmgarcom/:idgarcom",async(req,res)=>{

  await Garcom.update(
    {
    nmgarcom: req.params.nmgarcom,//deixo o fl com 1 e n deleto
    },
  {
    where:{
      idgarcom: req.params.idgarcom,
    },
  })

  Garcom.findAll({
    where:{
      flgarcom: 0,
    },
    order: ['idgarcom'],
}).then(() =>
      res.render("garcomfind"));

})


routes.get("/garcome/:id",(req,res)=>{

  Garcom.findOne({
    where:{
      idgarcom: req.params.id,
    }
  }).then(resposta =>{
    res.render("garcomalter",{
      garcoms : resposta
    });
  });
})

routes.get("/garcomd/:id", async(req,res) =>{

  await Garcom.update(
    {
    flgarcom: 1,//deixo o fl com 1 e n deleto
    },
  {
    where:{
      idgarcom: req.params.id,
    },
  })

  Garcom.findAll({
    where:{
      flgarcom: 0,
    },
    order: ['idgarcom'],
}).then(() =>
      res.render("garcomfind"));

})


 
export { routes as default }; 

/*
routes.get("/garcomd/:id", async(req,res) =>{

  await Garcom.update(
    {
    flgarcom: 1,//deixo o fl com 1 e n deleto
    },
  {
    where:{
      idgarcom: req.params.id,
    },
  })

  Garcom.findAll({
    where:{
      flgarcom: 0,
    },
    order: ['idgarcom'],
}).then(resposta =>{
      res.render("garcom",{
    garcoms : resposta
    });
  });

});*/

//terei de fazer uma lista para que apareca os inativos tb...