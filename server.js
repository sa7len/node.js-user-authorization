const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())
const users=[]

app.get('/users', (req,res)=>{
    req.json(users)
})

app.post('/users', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt )
        console.log(salt)
        console.log(hashedPassword)
        const user = {name: req.body.name , password: hashedPassword}
        user.push(users)
        res.status(201).send()
        hash(salt + 'password')
    } catch{
         res.status(500).send()
    }
})
app.post('/users/login', async (req,res)=>{
    const user = users.find(user=> user.name= req.body.name)
    if(user==null){
        return res.status(400).send('cannot find')
    } try{
      if (await  bcrypt.compare(req.body.password,user.password)){
        res.send('success') 
      }
      else{
        res.send('not allowed')
    }
    } catch{
        res.status(500).send()

    }

})
app.listen(3000)