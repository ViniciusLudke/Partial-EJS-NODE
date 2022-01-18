import { Sequelize } from "sequelize"; 

import db from "./db.js"; 

export default db.define("pedidodeletado",{

    idpedidodeletado:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },


    idcomanda:{
        type:Sequelize.BIGINT,
        allowNull: false
    },

    idproduto:{
        type:Sequelize.BIGINT,
        allowNull: false
    },


    vlvenda:{
        type:Sequelize.DOUBLE(8,2),
        allowNull: false
    }

},{ 

    freezeTableName: true, 

    timestamps: false, 

});