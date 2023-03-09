const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password, users[i].passHash)
        if (users[i].username === username && existingPass) {
          let returnUser = {...users[i]}
          delete returnUser.passHash
          res.status(200).send(returnUser)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username, password, email, firstName, lastName} = req.body
      const salt = bcrypt.genSaltSync(5)
      const passHash = bcrypt.hashSync(password, salt)
      let userObj = {
        username,
        email,
        firstName,
        lastName,
        passHash
      }
        console.log('Registering User')
        console.log(passHash)
        users.push(userObj)
        res.status(200).send(userObj)
        console.log(users)

    }
}