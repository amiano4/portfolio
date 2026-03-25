/**
 * Fallback contact handler — saves submissions to storage/contacts.csv.
 * Works out of the box with no configuration.
 *
 * To use your own mailing service:
 *   1. Copy this to server/api/contact.post.ts (gitignored)
 *   2. Replace the CSV logic with your own email API call
 */
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const escape = (val: string) => `"${String(val).replace(/"/g, '""')}"`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, subject, message } = body

  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 400, message: 'All fields are required.' })
  }

  const dir = resolve('storage')
  const csvPath = resolve('storage/contacts.csv')

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  if (!existsSync(csvPath)) {
    writeFileSync(csvPath, 'timestamp,name,email,subject,message\n')
  }

  const row = [
    escape(new Date().toISOString()),
    escape(name),
    escape(email),
    escape(subject),
    escape(message),
  ].join(',')

  appendFileSync(csvPath, row + '\n')

  return { success: true }
})
