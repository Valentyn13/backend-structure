const transformProps = (props, object) => {
    props.forEach((whatakey) =>{
        let index = whatakey.indexOf('_');
        let newKey = whatakey.replace('_', '');
        newKey = newKey.split('')
        newKey[index] = newKey[index].toUpperCase();
        newKey = newKey.join('');
        object[newKey] = object[whatakey];
        delete object[whatakey];
    })
}


module.exports = transformProps