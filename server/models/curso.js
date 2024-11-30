module.exports = (sequelize, DataTypes) => {

    const curso = sequelize.define("curso", {
        id_curso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        curso: {
            type: DataTypes.STRING,
        },

    });

    return curso;
};
