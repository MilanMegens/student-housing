import express from 'express'
import { db } from './db.js'

const app = express()

app.get('/api/test', async (req, res) => {
  const [rows] = await db.execute('SELECT 1 + 1 AS uitkomst')
  res.json(rows)
})

app.listen(3000, () => console.log('Back-end draait op poort 3000'))

app.get('/api/energie', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT jaar, maand, SUM(elektriciteit) AS elektriciteit, SUM(gas) AS gas
      FROM energiekosten
      GROUP BY jaar, maand
      ORDER BY jaar, maand
    `)
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ fout: 'Kon energiedata niet ophalen' })
  }
})

app.get('/api/energie/per-huis', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT huis_id, jaar, maand, elektriciteit, gas
      FROM energiekosten
      ORDER BY huis_id, jaar, maand
    `)
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ fout: 'Kon energiedata per huis niet ophalen' })
  }
})

app.get('/api/huizen', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT huis_id, stad, adres
      FROM huis
      ORDER BY huis_id
    `)
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ fout: 'Kon huizen niet ophalen' })
  }
})