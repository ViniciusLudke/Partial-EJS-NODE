import { Sequelize } from "sequelize";

import db from "./db.js"


export default db.define("detalhepagamento", {

    idpagamento:{
        type:Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    idcomanda:{
        type:Sequelize.BIGINT,
        allowNull: false,
        references:{model:"comanda", key:"idcomanda"}
    },

    idcategoriapagamento:{
        type:Sequelize.BIGINT,
        allowNull: false,
        references:{model:"categoriapagamento", key:"idcategoriapagamento"}

    },

    vlpago:{
        type:Sequelize.DOUBLE(8,2),
        allowNull: false,
        defaultValue: 0
    }

    

},{ 

    freezeTableName: true, 

    timestamps: false, 

});