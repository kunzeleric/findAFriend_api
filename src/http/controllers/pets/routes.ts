import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import multer from 'fastify-multer'

export const petsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  const storage = multer.memoryStorage()
  const upload = multer({ storage })

  app.post('/pets', { preHandler: upload.array('images', 6) }, create)
}
