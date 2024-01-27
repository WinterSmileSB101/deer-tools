export async function games(): Promise<void> {
  const users = await prisma.game.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  console.log('users', users);
}

export async function insertGame(): Promise<void> {
  const insertRes = await prisma.game.create({
    data: {
      name: 'Who is the Spy',
      description: 'Find who is the spy or hide when you is.',
    },
  });
}
