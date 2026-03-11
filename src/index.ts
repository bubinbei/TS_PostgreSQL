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
// withPrisma подключен глобально, передавать не обязательно
// app.get('/users/:id', withPrisma, async (c) => {
app.get('/users/:id', async (c) => {
  const prisma = c.get('prisma')
  const id = c.req.param('id')
  const user = await prisma.user.findUnique({
    where: { id }
  })
  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  return c.json(user)
})

// create
// withPrisma подключен глобально, передавать не обязательно

app.post('/users', async (c) => {
  const prisma = c.get('prisma')
  const { mail, password, username } = await c.req.json();
  const id = c.req.param('id')
  const user = await prisma.user.create({
    data: { 
      mail, 
      password, 
      username 
    }
  })
  return c.json(user, 201)
})

// update
// update
app.put('/users/:id', async (c) => {
  const prisma = c.get('prisma')
  const id = c.req.param('id')
  const { mail, password, username } = await c.req.json()
  const user = await prisma.user.update({
    where: { id },
    data: { mail, password, username }
  })
  return c.json(user)
})
// delete
app.delete('/users/:id', async (c) => {
  const prisma = c.get('prisma')
  const id = c.req.param('id')
  const user = await prisma.user.delete({
    where: { id }
  })
  return c.json(user)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
