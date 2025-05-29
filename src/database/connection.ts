import { Sequelize } from "sequelize";

/*const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});*/

const sequelize = new Sequelize(
  "railway",
  "root",
  "YMQKexHOTzYDAkmoUhVMuHjdQWOjVefn",
  {
    host: "containers-us-west-xx.railway.app",
    port: Number(3306),
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;