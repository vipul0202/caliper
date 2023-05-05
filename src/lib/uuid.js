const { v4: uuidv4 } = require('uuid');

export function createUuid(){
    const myUuid = uuidv4();
    // console.log(myUuid);
    return myUuid;
}
