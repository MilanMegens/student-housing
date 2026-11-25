import express from 'express'
import { db } from './db.js'

const app = express()

app.get('/api/test', async (req, res) => {
  const [rows] = await db.execute('SELECT 1 + 1 AS uitkomst')
  res.json(rows)
})

app.listen(3000, () => console.log('Back-end draait op poort 3000'))