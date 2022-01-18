import { Sequelize } from "sequelize"; 


import db from "./db.js"; 


export default db.define("pedido",{

    idpedido:{

        type:Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    idcomanda:{
        type:Sequelize.BIGINT,
        allowNull: false,
        references:{model:"comanda", key:"idcomanda"},
    },

    idproduto:{
        type:Sequelize.BIGINT,
        allowNull: false,
        references:{model:"produto", key:"idproduto"},

    },


    vlvenda:{
        type:Sequelize.DOUBLE(8,2),
        allowNull: false,
    }


},{ 

    freezeTableName: true, 

    timestamps: false, 

});