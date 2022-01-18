
import categoria from "./categoriaModel.js"; 
import garcom from "./garcomModel.js"; 
import produto from "./produtoModel.js";
import pedido from "./pedidoModel.js";
import comanda from "./comandaModel.js";
import categoriapagamento from "./categoriapagamentoModel.js";
import detalhepagamento from "./detalhepagamentoModel.js";
//import pedidodeletado from "./pedidodeletado.js";


//Devemos instanciar as operações do Sequelize que queremos
import sequelize, { Sequelize } from 'sequelize'; 

const Op = sequelize.Op; 

//Devemos instanciar as operações do Sequelize que queremos

const dbName = process.env.DB_NAME; 

const dbUser = process.env.DB_USER; 

const dbHost = process.env.DB_HOST; 

const dbPassword = process.env.DB_PASSWORD; 

  

const sql = new Sequelize(dbName, dbUser, dbPassword, { 

  dialect: "postgres", 

  host: dbHost, 

}); 




 

categoria.hasMany(produto, { 

    foreignKey: 'idcategoria' 

}); 

produto.belongsTo(categoria, { 

    foreignKey: 'idcategoria' 

}); 

  

garcom.hasMany(comanda, { 

    foreignKey: 'idgarcom' 

}); 

comanda.belongsTo(garcom, { 

    foreignKey: 'idgarcom' 

}); 

  

produto.hasMany(pedido, { 

    foreignKey: 'idproduto' 

}); 

pedido.belongsTo(produto, { 

    foreignKey: 'idproduto' 

}); 
//--------

comanda.hasMany(pedido,{
    foreignKey: 'idcomanda'
});
pedido.belongsTo(comanda,{
    foreignKey: 'idcomanda'
});

//-----------

comanda.hasMany(detalhepagamento,{
    foreignKey: 'idcomanda'
});

detalhepagamento.belongsTo(comanda,{
    foreignKey:'idcomanda'
});
//-----------

categoriapagamento.hasMany(detalhepagamento,{
    foreignKey: 'idcategoriapagamento'
});

detalhepagamento.belongsTo(detalhepagamento,{
    foreignKey: 'idcategoriapagamento'
})

//-----------------------------------------consultas--------------------------------------------------------
//okk
function query1(req, res){ 

    produto.findAll({
        raw: true, 
        attributes: [['vlproduto', 'valor'], 'nmproduto'], 
        where: { 
            flsituacao: {[Op.eq]: 1}, 
        }, 
        include: [{ 
            model: categoria, 
            attributes: ['nmcategoria'], 
            where: { 
                flsituacao: {[Op.eq]: 1}, 
            }, 
        }]  
    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)}); 

} 


/*
2)ok
Listar (Nome do produto e Valor) de um determinado tipo 
que deverá ser passado como parâmetro de filtragem, 
ordene a consulta por valor, mostrando do 
mais barato para o mais caro.*/
function query2(req,res){

    produto.findAll({

        attributes:['nmproduto', 'vlproduto'],
        where:{
            idcategoria:{[Op.eq]: req.params.id},
            flsituacao:{[Op.eq]: 1}
        },

        order:[['vlproduto', 'asc']]

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)}); 

}

/*o
function query2(req,res){
    produto.findAll({
       attributes: ['nmproduto', ['vlproduto', 'valor'] ],
       where:{
           idcategoria:{[Op.eq]: req.params.id},
       },
       order:[['vlproduto',]]

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});
}
*/
/*3)ok
ok Listar todas as comandas
	(Número da comanda, Data da comanda e Nome do garçom e Situação da comanda),
	ordenadas por Nome do garçom e Data da comanda. 
	Observação a situação da comanda deve apresentar a informação 
	(Aberta ou Fechada) de acordo com sua situação. */

    function query3(req, res){
        
        comanda.findAll({
            raw:true,
            attributes:['idcomanda','dhcomanda','flcomanda'],
        include:{
            model:garcom,
            attributes:['nmgarcom','idgarcom'],
            //rder:['nmgarcom']        order:['dhcomanda'],

        },

        order:[[garcom, 'nmgarcom', 'asc'],['dhcomanda']],


        }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});

    }

    /*okk
4)+- ok  Listar todos os produtos vendidos em uma determinada comanda
que deverá ser passada como parâmetro de filtragem, 
(Apresentar Nome do produto e Valor). 
mostrar na sequência em que o cliente pediu os produtos para o garçom, 
ou seja, ele pediu um X-Salada e depois uma Coca-cola a 
consulta deve respeitar essa ordem na apresentação dos resultados.*/

    function query4(req,res){


        produto.findAll({

            raw:true,
            attributes: ['nmproduto', ],
            include:[{
                model: pedido,
                attributes: ['vlvenda'],
                where:{

                    idcomanda:{[Op.eq]: req.params.id}
                },     
        
            }],

            order:[[pedido,'idpedido','asc']],

        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

    }
/*5) okk
    Contar e mostrar a quantidade de itens de uma determinada comanda, o
    u seja, passar o número da comanda como parâmetro e devolver
     a quantidade de itens que a comanda possui.*/

    function query5(req, res){

        pedido.findAll({

            attributes:[[sequelize.fn('count', sequelize.col('idproduto')), 'qtitens' ] ],
            where:{
                idcomanda:{[Op.eq]: req.params.id},
            }

        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});
    }

/*6)

Calcular o valor total de uma determinada comanda,
 ou seja, passo o número da comanda como parâmetro e 
 devolver a valor total desta comanda.*/

    function query6(req, res){

        pedido.findAll({
            raw: true,
            group: [sequelize.literal('"pedido"."idcomanda", "comanda"."idcomanda"')],
            attributes: ['idcomanda', //[sequelize.literal('sum(pedido.vlvenda) - produto.idcomanda'), 'tl'],
           //[sequelize.fn('sum', sequelize.col('vlvenda')), 'total'] 
        ],
            
            where:{
                idcomanda:{[Op.eq]: req.params.id}
            },

            include:{
                model:comanda,
                attributes:[ [sequelize.literal('sum(vlvenda) - desccomanda'), 'total']],
            }


            

        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

    }

 /*7)ok

  Listar todos os garçons e a quantidade de comandas que
   cada um já atendeu, ordene por ordem decrescente a quantidade
   de comandas para criar um ranqueamento de garçons.
  * */

    function query7(req, res){
    
        garcom.findAll({
        
            attributes: ['nmgarcom', [sequelize.fn('count', sequelize.col('idcomanda')), 'qtcomanda']],

           // order:[[]]
            include:{
                model:comanda,
                attributes:[],
            },

            order:[[sequelize.fn('count', sequelize.col('idcomanda')), 'desc']],
            group: 'garcom.idgarcom',

            

           // order:[['garcom.idcomanda', 'asc']],
        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

    }

/*8 Listar todos todas as comandas abertas, mostrando 
(Número da comanda, Nome do garçom, Quantidade de itens e Valor total da comanda). 
Ordenar por número da comanda de forma crescente.*/
/*
*/ 


function query8(req,res){

    comanda.findAll({
        raw: true,
        attributes:['idcomanda'],
        where:{
            flcomanda:{[Op.eq]: 0}
        },

        include:[{
            model:pedido,
            //attributes:['']
            include:[{
                model:produto,
                attributes:['idproduto'],
            }]
        }],
        
  



    

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});

}








/*
 9 Listar todas as comandas fechadas (Número da comanda e nome do garçom)
 de um determinado período, exemplo: 
 Todas as comandas entre (01/06/2021 até 05/06/2021). *

*/ 

    function query9(req,res){

        comanda.findAll({
            //type: Data.Types.TEXT,
            attributes:['idcomanda'],
           
            where:{
                flcomanda:{[Op.eq]: 1},
                //preciso do cast
                dhcomanda:{[Op.between]: [req.body.data, req.body.data2]}
            },

            include:{
                model:garcom,
                attributes:['nmgarcom']
            }
        
        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});


    }


    /*

10  Listar todas
 as comandas fechadas que não tiveram itens vinculados a elas.
  (Apresente o número e data) destas comandas.
	select comanda.idcomanda, 
	  cast (comanda.dhcomanda as date) dtcomanda,
	  cast (comanda.dhcomanda as time) hrcomanda
      from comanda 
	 where comanda.flcomanda = 1
	   and comanda.idcomanda 
    not in (select pedido.idcomanda
              from pedido
             where pedido.flsituacao = 1);


*/
//okk
function query10(req,res){

    comanda.findAll({

        attributes:['idcomanda'],
        where:{
            flcomanda:{[Op.eq]: 1},
            idcomanda: {[Op.notIn]:[sequelize.literal('select pedido.idcomanda from pedido')]},
        }
    }).then((result) => res.json(result)).catch((err)=>{ 
        res.status(400).send(err)});
}






//----

/*11-okk
   Listar os 3 produtos mais vendidos de um determinado período,
   exemplo: Todas as comandas entre (01/06/2021 até 05/06/2021).*/

   function query11(req,res){

        produto.findAll({
            raw:true,
            limit: 3,
            attributes:['nmproduto','idproduto',],
            group:['produto.idproduto', 'produto.nmproduto','pedidos.idproduto'],
            order:[[sequelize.fn('count',sequelize.col('produto.idproduto')),'desc']],
    
            include:[{
                model:pedido,
                attributes:[[sequelize.fn('count',sequelize.col('produto.idproduto')),'total']],
                duplicating: false,
    
                include:[{
                    model:comanda,
                    attributes:[],
                    where:{
                        dhcomanda:{[Op.and]:[
                            {[Op.gte]: '2021-01-05'},
                            {[Op.lte]: '2021-12-30'}]
                        }
                    }
                }],
    
            }]   
         }).then((result) => res.json(result)).catch((err)=>{ 

                res.status(400).send(err)});
     }
/*

    produto.findAll({
        raw:true,
        limit: 3,
        attributes:['nmproduto','idproduto',],
        group:['produto.idproduto', 'produto.nmproduto','pedidos.idproduto'],
        order:[[sequelize.fn('count',sequelize.col('produto.idproduto')),'desc']],

        include:[{
            model:pedido,
            attributes:[[sequelize.fn('count',sequelize.col('produto.idproduto')),'total']],
            duplicating: false,
        }]




*/

/*
12-eh a do dia

*/ 


/*13-okkk
Listar o número da comanda, nome e valor dos produtos 
de um determinado grupo de comandas, ou seja, 
como parâmetro posso informar uma lista de comandas, exemplo: 1, 2, 3*/


function query13(req,res){

    comanda.findAll({
        raw:true,
        attributes:['idcomanda'],
        order:'idcomanda',
        where:{
            idcomanda:{[Op.in]: [sequelize.literal(req.body.idlista)]},
        },

        include:[{
            model:pedido,
            attributes:['vlvenda'],

            include:{
                model:produto,
                attributes:['nmproduto'],
            }

        }],

        order:['idcomanda'],

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});


}


//14-okk
//Listar o nome e tipo de todos os produtos que não tiveram venda em um determinado período.

function query14(req,res){

    produto.findAll({
        raw: true,
        attributes:['nmproduto','idproduto'],
        order:['idproduto'],
        where:{//falta ajustar a data do between
            idproduto:{[Op.notIn]: [sequelize.literal(`select pedido.idproduto from pedido join comanda on comanda.idcomanda = pedido.idcomanda where comanda.flcomanda = 1 and cast(dhcomanda as date) between'${req.body.dt}' and '${req.body.dt2}'`)]},
        },
        include:[{
            model:categoria,
            attributes:['nmcategoria'],
        }]
        
    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});

}

/*okk
15) Listar o nome dos garçons que não atenderam clientes em um determinado dia. 
*/

function query15(req, res){

    garcom.findAll({

        attributes:['nmgarcom','idgarcom'],
        order:['idgarcom'],
        where:{//falta ajustar o dia
            idgarcom:{[Op.notIn]: [sequelize.literal(`select c.idgarcom from comanda c where cast(c.dhcomanda as date) = '${req.body.dt}'`)]}
        },

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});

}

      /*  okk
           16) Mostrar o cardápio completo com a quantidade total vendida de cada produto. */

    function query16(req,res){


        pedido.findAll({
            raw: true,
            attributes:[[sequelize.fn('count', sequelize.col('pedido.idpedido')), 'tlvenda']],
            group:[sequelize.literal('"produto"."idproduto","produto->categorium"."nmcategoria","produto->categorium"."idcategoria"')],

            include:[{
                model:produto,
                attributes:['idproduto','nmproduto'],

                include:[{
                    model:categoria,
                    attributes:['nmcategoria'],
                }]

            }],

            order:[sequelize.literal('"produto->categorium"."idcategoria" ASC, "produto"."idproduto" asc')],

        }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

    }

/*17-okk
         * Listar o cardápio que um determinado garçom vendeu em um determinado dia,
         *  ou seja, ao informar um determinado garçom liste somente os
         *  itens do cardápio que ele realizou pelo menos uma venda daquele produto.
*/

function query17(req,res){

    garcom.findAll({
        raw: true,
        //order:[[produto,'idproduto', 'asc']],
        attributes:[],
        where:{
            idgarcom:{[Op.eq]: req.params.id}
        },

        include:[{
            model:comanda,
            attributes:[],
            where:{
idcomanda:{[Op.in]: [sequelize.literal(`select c.idcomanda from comanda c where cast(dhcomanda as date) = '${req.body.dt}'`)]},
            },

            include:[{
                model:pedido,
                attributes:[],
                required: true,

                include:[{
                    model:produto,
                    attributes:['idproduto','nmproduto'],
                    required: true,

                    include:[{
                        model:categoria,
                        attributes:['nmcategoria'],
                        required: true,
                    }]

                }]

            }]

        }]


    }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

}

function query18(req,res){

    produto.findAll({

        attributes:['nmproduto', 'idproduto'],

        where:{
            idproduto:{[Op.notIn]: [sequelize.literal('select pedido.idproduto from pedido')]}
        },

    }).then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});


}

         
         /*
          *  19-Listar todos produtos de um determinado tipo 
          * que nunca tiveram vendas em um determinado período.
          * */


function query19(req, res){

    produto.findAll({
    
        attributes:['idproduto','nmproduto'],
        where:{
            idcategoria:{[Op.eq]: req.params.id},
            idproduto:{[Op.notIn]: [sequelize.literal(`select pedido.idproduto from pedido join comanda on comanda.idcomanda = pedido.idcomanda where cast(comanda.dhcomanda as date) between '${req.body.date1}' and '${req.body.date2}'`)]}
        },

    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});
 
}


//transaction
/*
const t = await sequelizeConfig.transaction({
    autocommit: false
})

const garcomdetalhes = await garcom.create({
    nmgarcom: 'vinicius',
  }, {transaction: t})

  await t.commit()
  return t

  finished == 'commit'

  if(response.finished == 'commit'){
      return res.json({
          
        code:'',
      })
  }*/

  ////////////////////////////////transaction.
/*
  var transactions = async(req,res)=>{

    const t = await sequelize.Transaction();
    try{

        const user = await garcom.create({nmgarcom:'vludke'},{
            transaction:t
        })

        console.log("commit");
        t.commit();
    }catch(e){
        console.log("roolback");
        t.roolback();
    }
    resp.status
(200).json('ok');
  }*/
/*
function teste(req, res){
  let transaction;

  try{
      //get transaction 
      transaction = await sequelize.transaction();
      //step 1
      await garcom.create({nmgarco:"vinicius"},{transaction});
  }catch(err){
      await transaction.roolback();
  }

}*/
/*
//start a transaction and save into a variable
const t = await sequelize.transaction();
try{
// Então, fazemos algumas chamadas passando esta transação como uma opção

    const user = await garcom.create({
        nmgarcom: 'vinicius',
    },{ transaction: t});

    await t.commit();

}catch (error){
    await t.rollback();
}
*/


var transactions = async(req,res)=>{
    //let data = 'transactions';
   // console.log("teste");

   const y = await sequelize.Transaction();
   try{
    const garcom = await Garcoms.create({nmgarcom: 'Vinic'},{
        transaction:y
    })
    y.commit();
   }catch(e){
       y.rollback();
       
   }

   then((result) => res.json(result)).catch((err)=>{ 

    res.status(400).send(err)});

    //res.status(200).send('ok');

}
export default { query1 , query2, query3, query4, query5, query6, query7,query8, query9, query10,
     query11,query13, query14, query15,query16,query17, query18,query19, transactions};

/*Listar

.then((result) => res.json(result)).catch((err)=>{ 

            res.status(400).send(err)});

*/


/*
function querytot(req,res){

    comanda.findAll({

        raw:true,
        //attributes:[''],

        include:[{
            model:pedido,
            attributes:['idpedido'],

            include:{
                model:produto,
                attributes:['nmproduto'],
            },

        }],
            include:[{
            model:garcom,
            attributes:['nmgarcom'],
        }]
    
    }).then((result) => res.json(result)).catch((err)=>{ 

        res.status(400).send(err)});

}

*/
/*
function queryteste(req,res){

    pedido.count({

        raw:true,
        col:'vlvenda',
        where:{
            idpedido: {
                [Op.eq]: req.params.id,
            },
        },

            include:[{
                model:pedido,
            }]

        }]


    }).then((result) => res.json(result)).catch((err)=>{ 
        res.status(400).send(err)});

}*/