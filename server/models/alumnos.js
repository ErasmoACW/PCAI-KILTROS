module.exports = (sequelize, DataTypes) => {

    const alumnos = sequelize.define("alumnos", {
        id_alumno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        apellido_1: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        apellido_2: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        rut: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true
        },
        correo_ap: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        nombre_ap: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido_ap: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        curso: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });

    return alumnos;
};
