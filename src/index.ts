import {PrismaClient} from './generated/client.ts';
import {PrismaPg} from '@prisma/adapter-pg'

const prismaClient = new PrismaClient({adapter: new PrismaPg({connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'})});

console.log('created users:');

console.log(await prismaClient.user.create({
    data: {
        name: 'test user 1',
    },
    select: {
        id: true,
        name: true,
        events: true,
    }
}));
console.log(await prismaClient.user.create({
    data: {
        name: 'test user 2',
        events: []
    },
    select: {
        id: true,
        name: true,
        events: true,
    }
}));

console.log('found users with empty events:')

console.log(await prismaClient.user.findMany({
    where: {
        events: {
            isEmpty: true,
        }
    },
    select: {
        id: true,
        name: true,
        events: true,
    }
}))

console.log('found users with null events:')

// this works
console.log(await prismaClient.user.findMany({
    where: {
        events: {
            equals: null,
        }
    },
    select: {
        id: true,
        name: true,
        events: true,
    }
}))

process.exit(0);

// this fails both at compile time (type checking with TypeScript) and at runtime (Invalid `prismaClient.user.findMany()` invocation)
console.log(await prismaClient.user.findMany({
    where: {
        events: null
    },
    select: {
        id: true,
        name: true,
        events: true,
    }
}))