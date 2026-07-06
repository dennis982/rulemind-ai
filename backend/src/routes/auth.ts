import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pool from '../config/database.js'
import { v4 as uuidv4 } from 'uuid'

const router = Router()

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()

    const result = await pool.query(
      'INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
      [id, email, hashedPassword, role || 'user']
    )

    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    })

    res.status(201).json({ user: result.rows[0], token })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = result.rows[0]
    const validPassword = await bcrypt.compare(password, user.password_hash)

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    })

    res.json({ user: { id: user.id, email: user.email, role: user.role }, token })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
