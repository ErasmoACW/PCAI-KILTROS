module.exports = (sequelize, DataTypes) => {

    const admin = sequelize.define("admin", {
        id_admin: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    });

    return admin;
};
