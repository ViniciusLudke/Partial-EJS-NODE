import { Sequelize } from "sequelize"; 


import db from "./db.js"; 

  

export default db.define("produto", { 

    idproduto:{
        type:Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    idcategoria:{
        type:Sequelize.BIGINT,
        allowNull: false,
        references: {model: "categoria", key: "idcategoria"},
    },

    nmproduto:{
        type:Sequelize.STRING,
        allowNull: false
    },
    dsproduto:{

        type:Sequelize.TEXT,
        allownull: false

    },
    vlproduto:{

        type:Sequelize.DOUBLE,
        allownull: false,

    },

    flsituacao:{

        type:Sequelize.INTEGER,
        allownull: true,
        defaultValue: 0

    }  


},{ 

    freezeTableName: true, 

    timestamps: false, 

});