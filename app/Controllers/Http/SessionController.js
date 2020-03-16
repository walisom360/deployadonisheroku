'use strict'

class SessionController {
  async store({auth,request,response}){
   const {email ,password} = request.all()

    const token = auth.attempt(email ,password)

    return token
  }
}

module.exports = SessionController
