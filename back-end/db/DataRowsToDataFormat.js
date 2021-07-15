const toDataFormat = (dataRows, format) => {
    const response = [];
    const modelOject = {...format};
    dataRows.map(row => {
        Object.keys(format.fields).forEach((key) => {
            modelOject[`${key}`] = row[format.fields[`${key}`]];
        });
        response.push({...modelOject});
    })
    return response;
}
module.exports.toDataFormat = toDataFormat;