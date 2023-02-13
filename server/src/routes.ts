import { FastifyInstance } from 'fastify'
import { prisma } from './lib/prisma'
import { z } from 'zod'
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance) {  
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)
        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    }),
                }
            }
        })
    })

    app.patch('/habits/rename', async (request) => {
        const updateHabitBody = z.object({
            id: z.string().uuid(),
            new_title: z.string(),
        })

        const { id, new_title } = updateHabitBody.parse(request.body)

        await prisma.habit.update({
            where: {
                id,
            },
            data: {
                title: new_title,
            }
        })
    })
    
    app.patch('/habits/:id/toggle/:date', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid(),
            date: z.coerce.date() 
        })

        const { id, date } = toggleHabitParams.parse(request.params)
        
        const parsedDate = dayjs(date).startOf('day').toISOString()

        let day = await prisma.day.findUnique({
            where: {
                date: parsedDate,
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: parsedDate,
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id,
                }
            }
        })

        if (dayHabit) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id,
                }
            })
        } else {
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }
    })

    app.get('/habits/all', async() => {
        const allHabits = await prisma.habit.findMany()

        return {
            allHabits
        }
    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            },
        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits,
        }
    })

    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
            SELECT 
              D.id, 
              D.date,
              (
                SELECT 
                  cast(count(*) as float)
                FROM day_habits DH
                WHERE DH.day_id = D.id
              ) as completed,
              (
                SELECT
                  cast(count(*) as float)
                FROM habit_week_days HDW
                JOIN habits H
                  ON H.id = HDW.habit_id
                WHERE
                  HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                  AND H.created_at <= D.date
              ) as amount
            FROM days D
        `

        return summary
    })
}