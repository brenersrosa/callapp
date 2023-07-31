import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { google } from 'googleapis'

import { prisma } from '../../../lib/prisma'

import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { getGoogleOAuthToken } from '@/lib/google'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  const username = session.user.username

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found.' })
  }

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  const newCalendar = {
    summary: 'appCall',
    description: 'Calendar with appointments from appCall aplication.',
    backgroundColor: '#00875F',
  }

  let calendarId = null

  await calendar.calendars
    .insert({
      requestBody: newCalendar,
    })
    .then(
      function (response) {
        console.log('Calendar created successfully.', response)
        calendarId = response.data.id
      },
      function (err) {
        console.error('Error with creating the calendar.', err)
      },
    )

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      schedule_id: calendarId,
      bio,
    },
  })

  return res.status(204).end()
}
