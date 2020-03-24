'use strict'

const Team = use('App/Models/Team')

class TeamController {

  async index ({ auth }) {
   const teams = await auth.user.teams().fetch()

   return teams

  }

  async store ({ request, auth,response }) {

   const data = request.only(['name'])

   let team = await Team.findBy('name',data.name)

   if(team){
      return response
      .status(400)
      .send({ message: "Team already create" });
   }

   team = await auth.user.teams().create({
     ...data,
     user_id:auth.user.id
   })

   return team
  }

  async show ({ params, auth ,response}) {
    const team = await auth.user.teams().where('teams.id',params.id).first()

    if(!team){
      return response
      .status(404)
      .send({ message: "Not found team" });
    }


    return team
  }


  async update ({ params, request,auth ,response}) {
    const data = request.only(['name'])

    const team = await auth.user.teams().where('teams.id',params.id).first()

    if(!team){
      return response
      .status(404)
      .send({ message: "Not found team of id"});
    }


    team.merge(data)

    await team.save()

    return team
  }


  async destroy ({ params, auth}) {
    const team = await auth.user.teams().where('teams.id',params.id).first()

    await team.delete()
  }



}

module.exports = TeamController
