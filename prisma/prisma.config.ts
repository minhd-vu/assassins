import { PrismaConfig } from "@prisma/client";

export default {
  datasources: {
    db: {
      url: process.env.MONGODB_URI,
    },
  },
} satisfies PrismaConfig;
