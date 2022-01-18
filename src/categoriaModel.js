import { Sequelize } from "sequelize"; 

import db from "./db.js"; 

  

export default db.define("categoria", { 

    idcategoria: { 

        type: Sequelize.BIGINT, 

        primaryKey: true, 

        autoIncrement: true, 

        allowNull: false
      }, 

    nmcategoria: { 

        type: Sequelize.STRING, 

        allowNull: false

    }, 

    flsituacao: { 

        type: Sequelize.INTEGER, 

        allowNull: true, //n permitido nulo, false n permite e true = permite

        defaultValue: 1 

        }, 

},{ 

    freezeTableName: true, 

    timestamps: false, 

}); 