const fileSystem = require('fs');

const getAllUsers = () => {
    const users = loadUsers();
    return users;
}


const getUserByUsername = (username) => {
    const allUsers = loadUsers();
    const specificUser = allUsers.filter((u) => {return u.username == username});
    console.log(specificUser)
    // if(specificUser.length != 0){
    //     return specificUser
    // } else {
    //     return {
    //         error : 'User does not exist on DB',
    //         message : 'Could not found the user !'
    //     }
    // }
    // Yukarıdaki if else yerine aşağıdaki one line koşulu yaptık
    return specificUser.length != 0 ? specificUser : { error : 'User does not exist on DB', message : 'Could not found the user !' }
}


const loadUsers = () => {
    try {
        const dataBuffer = fileSystem.readFileSync('./public/users.json')
        const dataString = dataBuffer.toString();
        let dataObject = JSON.parse(dataString);
        return dataObject
    } catch (error) {
        return []
    }
}

const addUser = (user) => {
    const allUsers = loadUsers();
    const duplicateUsers = allUsers.filter((u) => {return u.username == user.username})
    if(duplicateUsers.length != 0){
        return {
            error : "Username exist",
            message : "This user name has been taken"
        }
    }
    allUsers.push(user);
    saveUser(allUsers);
    return {
        status : 'OK',
        message : 'User added succesfully',
        userInfo : user
    }
}



// Tüm kullanıcı datasını tekrar alıp yazar !
const saveUser = (user) => {
    const userJSONstr = JSON.stringify(user);
    fileSystem.writeFileSync('./public/users.json', userJSONstr);
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    addUser
}