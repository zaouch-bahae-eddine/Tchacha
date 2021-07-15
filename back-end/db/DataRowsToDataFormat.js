const toDataFormat = (dataRows, format) => {
    const response = [];
    const modelOject = {...format.fields};
    dataRows.map(row => {
        Object.keys(format.fields).forEach((key) => {
            modelOject[`${key}`] = row[format.fields[`${key}`]];
        });
        response.push({...modelOject});
    })
    if(response.length == 0){
        return null
    } else if(response.length == 1){
        return response[0];
    }
    return response;
}
module.exports.toDataFormat = toDataFormat;