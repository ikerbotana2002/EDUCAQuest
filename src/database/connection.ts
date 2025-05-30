import { Sequelize } from "sequelize";

const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});

/*
const sequelize = new Sequelize(
  "railway", // DB_NAME
  "root",    // DB_USER
  "YMQKexHOTzYDAkmoUhVMuHjdQWOjVefn", // DB_PASSWORD
  {
    host: "caboose.proxy.rlwy.net", // DB_HOST (público)
    port: 21134,                    // puerto correcto
    dialect: "mysql",
    logging: false,
  }
);*/

export default sequelize;
