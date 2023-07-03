import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.system.create({
    data: {
      name: "Solar System",
      planets: {
        create: [
          {
            title: "Earth",
            subTitle: "This is the earth",
            content: "This is what the earth is all about.",
            url: "https://earth.com",
            color: "#005067",
            size: 2,
            moons: {
              create: [{ title: "Moon" }],
            },
          },
          {
            title: "Mars",
            subTitle: "This is Mars",
            content: "This is what mars is all about.",
            url: "https://mars.com",
            color: "#a25007",
            size: 3,
            moons: {
              create: [{ title: "Phobos" }, { title: "Deimos" }, { title: "Titan" }],
            },
          },
          {
            title: "Saturn",
            subTitle: "This is Mars",
            content: "This is what mars is all about.",
            url: "https://mars.com",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                { title: "Phobos" },
                { title: "Deimos" },
                { title: "Titan" },
                { title: "Torius" },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
