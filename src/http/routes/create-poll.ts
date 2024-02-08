import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"


export async function createPoll(app: FastifyInstance) {
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
}

