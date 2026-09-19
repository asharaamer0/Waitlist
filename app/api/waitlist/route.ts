import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  who: z.array(z.string()).min(1),
  howHeard: z.string().optional(),
  // Legal gate: the form requires an explicit consent checkbox.
  // Validated here so consent can't be bypassed, but not stored in the sheet.
  consent: z.literal(true),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const { name, email, who, howHeard } = parsed.data

  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('Quill waitlist: missing Google Sheets environment variables')
    return NextResponse.json({ error: 'Waitlist is temporarily unavailable' }, { status: 500 })
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          who.join(', '),
          howHeard ?? '',
        ]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quill waitlist: failed to append sheet row', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
