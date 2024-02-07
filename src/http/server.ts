import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import { z } from 'zod'

const prisma = new PrismaClient()

const app = fastify()

app.post('/polls', async (request, reply) => {
  try {
  const createPollBody = z.object({
    title: z.string()
  })
    const { title } =  createPollBody.parse(request.body)
  
   const poll = await prisma.poll.create({
      data: {
        title,
      }
    })

    console.log(request.body)
  
    return reply.status(201).send({pollid: poll.id})
    
  } catch (error) {
    console.error(error)
    return reply.status(500).send({error: 'Server error'})
  }

})

app.listen({port: 3333}).then(()=>{
  console.log("HTTP Server runnig...")
})

