import { Sequelize } from "sequelize"; 

import db from "./db.js"; 



export default db.define("garcom", {

  idgarcom:{
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
  },

  nmgarcom:{
    type: Sequelize.STRING, 

    allowNull: false, 
  },
    idgarcommd5:{
      type:Sequelize.STRING,
      allowNull: true, 
    },
    flgarcom:{
      type:Sequelize.INTEGER,
      defaultValue: 0
    }


},{ 

  freezeTableName: true, 

  timestamps: false, 

});