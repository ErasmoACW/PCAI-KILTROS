module.exports = (sequelize, DataTypes) => {

    const Fechas = sequelize.define("fechas", {
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

    // Función para generar fechas dentro del modelo
    const generarFechas = (añoInicio, añoFin) => {
        const fechas = [];
        const fechaInicio = new Date(añoInicio, 0, 1);
        const fechaFin = new Date(añoFin, 11, 31);
    
        for (let fecha = fechaInicio; fecha <= fechaFin; fecha.setDate(fecha.getDate() + 1)) {
            // Formatear la fecha como "DD-MM-YYYY"
            const dia = String(fecha.getDate()).padStart(2, '0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0 indexados
            const año = fecha.getFullYear();
            fechas.push(`${año}-${mes}-${dia}`);
        }
    
        return fechas;
    };
    

    // Hook para insertar fechas después de la sincronización
    Fechas.afterSync(async () => {
        try {
            // Verificamos si ya existen fechas para evitar duplicados
            const count = await Fechas.count();
            if (count === 0) {
                // Si no hay fechas, generamos y cargamos las fechas en el rango deseado
                const añoInicio = 2024; // Ajusta según tus necesidades
                const añoFin = 2027;
                const fechasArray = generarFechas(añoInicio, añoFin).map(fecha => ({
                    fecha,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }));

                await Fechas.bulkCreate(fechasArray); // Inserta las fechas
                console.log(`${fechasArray.length} fechas insertadas correctamente.`);
            }
        } catch (error) {
            console.error("Error al insertar las fechas:", error);
        }
    });

    return Fechas;
};
