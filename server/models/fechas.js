module.exports = (sequelize, DataTypes) => {

    const fechas = sequelize.define("fechas", {
        id_fecha: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return fechas;
};
