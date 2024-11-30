const { sequelize } = require('../models'); // Importa la instancia de Sequelize
const { QueryTypes } = require('sequelize'); // Importa los tipos de consulta

async function getidfecha(fecha) {
    try {
        const query = `SELECT id_fecha FROM pcai.fechas WHERE fecha = :fecha`;
        const results = await sequelize.query(query, {
            replacements: { fecha }, // Parámetros para prevenir inyecciones SQL
            type: QueryTypes.SELECT, // Tipo de consulta
        });

        // Verifica si se encontró el id_fecha
        if (results.length > 0) {
            return results[0].id_fecha; // Devuelve el id_fecha
        } else {
            throw new Error(`No se encontró un registro con la fecha: ${fecha}`);
        }
    } catch (error) {
        console.error("Error en getidfecha:", error.message || error);
        throw error; // Reenvía el error para que lo maneje el llamador
    }
}

module.exports = { getidfecha };
