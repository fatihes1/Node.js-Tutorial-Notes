const express = require('express');
const {getAllUsers, getUserByUsername, addUser} = require('./utils/user')

const PORT = process.env.PORT || 8080 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    var homePage = `
        <h1>Welcome to add user system !</h1>
        <h2>You can us these end-point</h2>
        <h3>* /users/show --> Show all users</h3>
        <h3>* /users/show/[USER_NAME_IS_HERE] --> Show specific user</h3>
        <h3>* /user/add?name=[NAME_HERE]&surname=[SURNAME_HERE]&username=[USERNAME_HERE]</h3>
    `
    res.send(homePage)
})

// Route for show all user !
app.get('/users/show/:username?', (req, res) => {
    if(req.params.username){
        return res.send(getUserByUsername(req.params.username))
    }
    return res.send(getAllUsers());
})



// Route for adding user !
app.get('/users/add', (req, res) => {
    // /users/add?name=fatih&surname=es&username=esjr
    const userInfo = req.query;
    if(!userInfo.name || !userInfo.surname || !userInfo.username){
        res.send({ error : 'Need Parameter !', message : 'missing parameter' })
    }
    res.send(addUser(userInfo))
})


app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
})