const connection = require('../connection').promise();

const { toDataFormat } = require('../../db/DataRowsToDataFormat');

const findAll = async (format) => {
    try {
        const query = 'SELECT * FROM `' + format.table + '`';
        const [rows, allTodoFields] = await connection.query(query);
        return toDataFormat(rows, format);
    } catch (e) {
        console.log(`Erruer findAll ${e}`);
    }
}

const findById = async (id, format) => {
    try {
        const query = 'SELECT * FROM `' + format.table + '` WHERE `' + format.fields['id'] + '` = ?';
        const [rows, allTodoFields] = await connection.query(query, [id]);
        const result = toDataFormat(rows, format);
        return result;
    } catch (e) {
        console.log('format');
        console.log(format);
        console.log(`Erruer findById ${e}`);
    }
}

// consition {email: 'x@x.x', name:'y'} => Where email = 'x@x.x'And name = 'y'
 const findBy = async (condition, format) => {
    try {
        let where = "( ";
        for(const key in condition){
            where += `\`${format.fields[key]}\` = ? AND `;
        }
        where = where.slice(0, -4);
        where += ")";
        const query = 'SELECT * FROM `' + format.table + '` WHERE ' + where;
        const [rows, allTodoFields] = await connection.query(query, Object.values(condition));
        const result = toDataFormat(rows, format);
        return result;
    } catch (e) {
        console.log('format');
        console.log(format);
        console.log(`Erruer findById ${e}`);
    }
}

const add = async (data, format) => {
    let query = `INSERT INTO \`${format.table}\` `;
    let columns = '';
    let values = '';
    Object.keys(format.fields).forEach(key => {
        if (data[key] !== undefined && key !== 'id') {
            columns += `\`${format.fields[key]}\`, `;
            values += `?, `;
        }
    });
    columns = columns.slice(0, -2);
    values = values.slice(0, -2);
    query += `(${columns}) VALUES (${values});`;
    const [rows, allTodoFields] = await connection.query(query,Object.values(data));
    return await findById(rows.insertId, format);
}

const setById = async (data, format) => {
    let query = `UPDATE \`${format.table}\` SET `;
    Object.keys(format.fields).forEach(key => {
        if (data[key] != undefined && key !== 'id') {
            query += `\`${format.fields[key]}\` = '${data[key]}', `
        }
    });
    query = query.slice(0, -2);
    query += ` WHERE \`id\` = ?;`;
    const [rows, allTodoFields] = await connection.query(query, [data.id]);
    return await findById(data.id, format);
}

const deleteById = async (id, format) => {
    const query = `DELETE FROM \`${format.table}\` WHERE \`${format.fields.id}\` = ${id}`;
    const deletedObject = await findById(id, format);
    const [rows, allTodoFields] = await connection.query(query);
    return deletedObject;
}
/*const findByJoin = (condition, row, formatA, formatB) => {
    const query = 'SELECT ';
    Object.keys(row).forEach((key) => {
        query += formatA[key] != undefined ? (formatA.fields[key]+', ') : (formatB.fields[key]+', ');
    })
    query = query.slice(0, -2);
    query += ' FROM ' + formatA.table + ' INNER JOIN ' + formatB.table + ' ON ' + 
}*/
module.exports.QueryBuilder = {
    findAll: findAll,
    findById: findById,
    add: add,
    setById: setById,
    deleteById: deleteById,
    findBy: findBy
}