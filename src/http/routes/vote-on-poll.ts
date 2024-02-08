import z from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    try {
      const voteOnPollBody = z.object({
        pollOptionId: z.string().uuid(),
      });

      const voteOnPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = voteOnPollParams.parse(request.params);
      const { pollOptionId } = voteOnPollBody.parse(request.body);

      let { sessionId } = request.cookies;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
          signed: true,
          httpOnly: true,
        });
      }

      await prisma.vote.create({
        data: {
          sessionId,
          pollId,
          pollOptionId,
        }
      })
      
      return reply.status(201).send({ sessionId });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Server error vote on poll" });
    }
  });
}
