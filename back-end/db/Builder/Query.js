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
        return result[0];
    } catch (e) {
        console.log('format');
        console.log(format);
        console.log(`Erruer findById ${e}`);
    }
}
/*
condition: {
    // ((C or D) and (B or D))
    and: {
        or: {email: "a@a", password: "aze"},
        and: {name: "bahae", id: 15}
    }
}
*/
const conditionMaker = (condition, format) => {

};

 const findBy = async (condition, format) => {
    try {
        const query = 'SELECT * FROM `' + format.table + '` WHERE `' + format.fields['id'] + '` = ?';
        const [rows, allTodoFields] = await connection.query(query, [id]);
        const result = toDataFormat(rows, format);
        return result[0];
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
            values += `'${data[key]}', `;
        }
    });
    columns = columns.slice(0, -2);
    values = values.slice(0, -2);
    query += `(${columns}) VALUES (${values});`;
    const [rows, allTodoFields] = await connection.query(query);
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
    query += ` WHERE \`id\` = ${data.id};`
    console.log(query);
    const [rows, allTodoFields] = await connection.query(query);
    return await findById(data.id, format);
}

const deleteById = async (id, format) => {
    const query = `DELETE FROM \`${format.table}\` WHERE \`${format.fields.id}\` = ${id}`;
    const deletedObject = await findById(id, format);
    const [rows, allTodoFields] = await connection.query(query);
    return deletedObject;
}

module.exports.QueryBuilder = {
    findAll: findAll,
    findById: findById,
    add: add,
    setById: setById,
    deleteById: deleteById,
    conditionMaker: conditionMaker
}