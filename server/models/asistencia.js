module.exports = (sequelize, DataTypes) => {

    const asistencia = sequelize.define("asistencia", {
        id_asistencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_alumno: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        asistencia: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    asistencia.associate = (models) => {
        asistencia.belongsTo(models.alumnos, { foreignKey: 'id_alumno' });
    };

    return asistencia;
};
