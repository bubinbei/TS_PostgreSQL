import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import withPrisma, { type AppBindings } from './lib/prisma.js'

const app = new Hono<AppBindings>()

app.use('*', withPrisma)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users', async (c) => {
  const prisma = c.get('prisma')
  const users = await prisma.user.findMany()

  return c.json(users)
})

// get by id
// 
// create
// 
// update
// 
// delete
// 

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
