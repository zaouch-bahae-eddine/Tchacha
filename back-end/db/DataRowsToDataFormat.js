const toDataFormat = (dataRows, format) => {
    const response = [];
    const modelOject = {...format.fields};
    dataRows.map(row => {
        Object.keys(format.fields).forEach((key) => {
            if(modelOject[`${key}`] != undefined){
                modelOject[`${key}`] = row[format.fields[`${key}`]];
            } 
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
const toMultipleDataFormat = (dataRows, formats) => {
    const response = [];
    const modelObjet = {};
    Object.keys(formats).map(key => {
        modelObjet[`${key}`] = {...formats[`${key}`].fields};
    });
    dataRows.map((row) => {
        console.log(row);
        Object.keys(modelObjet).map(keyObj => {
            Object.keys(modelObjet[`${keyObj}`]).map(key => {
                console.log('row(keyy) => ', (formats[`${keyObj}`].table+'_'+ formats[keyObj].fields[key]));
                if(modelObjet[`${keyObj}`][`${key}`] != undefined){
                    modelObjet[`${keyObj}`][`${key}`]  = row[formats[`${keyObj}`].table+'_'+ formats[keyObj].fields[key]];
                }
            });
        })
        console.log("puch",modelObjet);
        response.push(JSON.parse(JSON.stringify(modelObjet)));
    });
    if(response.length == 0){
        return null
    } else if(response.length == 1){
        return response[0];
    }
    return response;

}
module.exports.toDataFormat = toDataFormat;
module.exports.toMultipleDataFormat = toMultipleDataFormat;