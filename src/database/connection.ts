import { Sequelize } from "sequelize";

const sequelize = new Sequelize("educa_quest" , "root", "4236", {
    host: "localhost",
    dialect: "mysql"
});

export default sequelize;