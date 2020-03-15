'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
   const user = await User.create({
     username:"Walison teste 1",
     email:"walisom370@hotmail.com",
     password:"123456"
   })

   await user.teams().create({
     user_id:user.id,
     name:"Rocketseat"
   })

  }
}

module.exports = DatabaseSeeder
