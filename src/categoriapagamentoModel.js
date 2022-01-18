import { Sequelize } from "sequelize";

import db from "./db.js";


export default db.define("categoriapagamento",{


    idcategoriapagamento:{

        type:Sequelize.BIGINT,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },

    dscategoriapagamento:{

        type:Sequelize.STRING,
        allowNull: false
    }

},{ 

    freezeTableName: true, 

    timestamps: false, 

});

