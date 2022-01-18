import { Sequelize } from "sequelize";

import db from "./db.js";

export default db.define("comanda", {

        idcomanda:
        {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        idgarcom:{
            type:Sequelize.BIGINT,
            allowNull: false,
            references:{model:"garcom", key:"idgarcom"}
        },

        flcomanda:{
            type:Sequelize.INTEGER,
            allowNull: true,
            default: 0

        },

        dhcomanda:{

            type:Sequelize.DATE,
            allowNull: false
        },

        desccomanda:{

            type:Sequelize.DOUBLE(3,2),
            allowNull: true,
            defaultValue: 0 

        },
  
},{ 

    freezeTableName: true, 

    timestamps: false, 

});