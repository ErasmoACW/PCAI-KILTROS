module.exports = (sequelize, DataTypes) => {

    const asistencia = sequelize.define("asistencia", {
        id_asistencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        curso: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        asistencias: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    asistencia.associate = (models) => {
        asistencia.belongsTo(models.alumnos, { foreignKey: 'id_alumno' });
        asistencia.belongsTo(models.fechas, { foreignKey: 'id_fecha' });
    };

    return asistencia;
};
