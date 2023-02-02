import { PrismaClient } from '@prisma/client'
//npx prisma db seed

const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T00:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T00:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T00:00:00.000')

const fourthHabitId = '704ba067-232b-4c55-8654-c18b7d797854'
const fourthHabitCreationDate = new Date('2023-01-20T00:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Ir a praia',
        created_at: firstHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Ir para academia',
        created_at: secondHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        created_at: thirdHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 0 },
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
            { week_day: 6 },
          ]
        }
      }
    }),

    prisma.habit.create({
      data: {
        id: fourthHabitId,
        title: 'Aulas de inglês',
        created_at: fourthHabitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 3 },
            { week_day: 5 },
          ]
        }
      }
    }),
  ])

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        date: new Date('2023-01-01T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-05T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-07T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          }
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-09T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: thirdHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-10T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: secondHabitId },
            { habit_id: thirdHabitId },
          ]
        }
      }
    }),

    prisma.day.create({
      data: {
        date: new Date('2023-01-25T03:00:00.000z'),
        dayHabits: {
          create: [
            { habit_id: thirdHabitId },
            { habit_id: fourthHabitId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
