import { Sequelize } from "sequelize";

/*
const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});
*/

const sequelize = new Sequelize(
  "railway", // nombre de la base de datos
  "root",    // usuario
  "EJaKsYrOuvfIUuXIAFsdzzFAhukUozQm", // contraseña
  {
    host: "centerbeam.proxy.rlwy.net",
    port: 19678,
    dialect: "mysql",
    logging: false
  }
);

export default sequelize;
