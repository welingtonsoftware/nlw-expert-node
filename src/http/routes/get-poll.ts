import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"


export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    try {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
      const { pollId } =  getPollParams.parse(request.params)
    
     const poll = await prisma.poll.findUnique({
        where: {
        id: pollId,
        },
        include: {
          options: {
            select:{
              id: true,
              title: true,
            }
          }
        }
      })

      return reply.status(201).send({ poll })
      
    } catch (error) {
      console.error(error)
      return reply.status(500).send({error: 'Server error get poll'})
    }
  })
}

