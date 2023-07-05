import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.system.create({
    data: {
      name: "Solar System",
      planets: {
        create: [
          {
            title: "Partner Equity",
            subTitle: "This is Zibra Partner Equity",
            content:
              "ZPE invests in small and medium sized companies as a majority owner. We are an active owner combining insights and capital and our ambition is to support our investments in reaching the next development level.",
            url: "https://zibrapartner.com/",
            color: "#005067",
            size: 2,
            moons: {
              create: [
                {
                  title: "Nordisk Innovation",
                  url: "https://www.nordisk-innovation.dk/",
                  content:
                    "Keeping rats away! Nordisk Innovation develops and sells patented rat barriers and safeguards for installation in sewage systems. The company has existed since 2006, and was acquired by Zibra Partner Equity in 2023.",
                },
              ],
            },
          },
          {
            title: "Confinze",
            subTitle: "This is Confinze",
            content:
              "Confinze is a finance-as-a-service provider specifically targeting start-up and scale-up companies. Our platform and service concept is adapted to the specific business model and creates transparency in the financial performance. This gives our customers the opportunity for better strategic and more value-creating decisions.",
            url: "https://www.confinze.io/",
            color: "#a25007",
            size: 3,
          },
          {
            title: "Zibra AS",
            subTitle: "This is Zibra AS",
            content:
              "Zibra A/S represents a groups of companies founded by Zibra or acquired and developed to the next level as a Zibra company. These companies represents our passion for entrepreneurship and venture building and we support these companies with corporate resources as HR, finance and legal. The companies BornFiber and Heartbeats are examples of Zibra founded companies that have been sold.",
            url: "https://shot.codes",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "Zibrasport Equest",
                  url: "https://www.zibrasportequest.com/",
                  content:
                    "Zibrasport is provider of streaming and content from the largest Danish Equestrian events and bringing it to the world in partnership with ClipMyHorse.tv. This makes us the right partner if you want to advertise directly to riders and equestrians in Denmark and internationally. We are also professional commercial marketing and content creators for a broad variety of businesses.",
                },
                {
                  title: "Zybersafe",
                  url: "https://zybersafe.com",
                  content:
                    "In a world of increasing targeted cyber-attacks protecting data in motion is crucial. With hardware security modules from Zybersafe you can easily secure your valuable data integrity and confidentiality with unparalleled simplicity, security, and speed. We simplify implementation of network data encryption.",
                },
                {
                  title: "Motus",
                  url: "https://motus.dk",
                  content:
                    "Motus is an operational security company with backup services as main business areas. But nothing stands alone so Motus also delivers IT Security Operation Center services as well as security check of IT infrastructure. The purpose is to make customers less dependent on internal resources to IT security, and to maintain control of costs, so the customers can focus their resources elsewhere.",
                },
              ],
            },
          },
          {
            title: "PeopleVentures",
            subTitle: "This is PeopleVentures",
            content:
              "We help entrepreneurs succeed by investing money and engage ourselves in early-stage companies. With a careful hand, we actively push and support early-stage startups with our operational skillset, experience, and network to move them fast forward.",
            url: "https://people.ventures",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "PV Sentispec",
                  url: "https://shot.codes",
                  content:
                    "Zibrasport is provider of streaming and content from the largest Danish Equestrian events and bringing it to the world in partnership with ClipMyHorse.tv. This makes us the right partner if you want to advertise directly to riders and equestrians in Denmark and internationally. We are also professional commercial marketing and content creators for a broad variety of businesses.",
                },
                {
                  title: "Zoios",
                  url: "https://shot.codes",
                  content: "Some content",
                },
              ],
            },
          },
          {
            title: "LactoBio",
            subTitle: "This is LactoBio",
            content: "Some content",
            url: "https://lactobio.com",
            color: "#0c9493",
            size: 2.5,
          },
          {
            title: "Inqvation",
            subTitle: "This is Inqvation",
            content:
              "inQvation represents Zibra Groups minority investments. These companies are very diverse startups with that in common that they have invented unique products with innovative business plans. This group of companies are administrated and supported by People Ventures.",
            url: "https://people.ventures",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "Byon8",
                  url: "https://byon8.com/",
                  content:
                    "Feeling sick or injured? The Byon8 App will compare your symptoms with thousands of similar clinically confirmed cases to help you find possible explanations and causes for your symptoms. A customized health recommendation will be provided to further guide you, and help you find the nearest doctor or hospital if necessary. Byon8 is one of our minority investments.",
                },
                {
                  title: "Inniti",
                  url: "https://inniti.io",
                  content:
                    "Want to make your lab smarter? With the Inniti connectivity solution you can connect any lab equipment and collect and store data in the cloud. With the solution you can also automate sample tracking, control your equipment and monitor your lab from anywhere.",
                },
                {
                  title: "LT Health",
                  url: "https://shot.codes",
                  content: "Some content",
                },
                {
                  title: "MXNEY",
                  url: "https://mxney.io",
                  content:
                    "MXNEY is the world's first all-in-one platform for ecommerce entrepreneurs, offering a wide range of services including financial products like business accounts, loans, payment gateway, acquiring, and more. Entrepreneurs can also aply for funding through MXNEY to help them grow their business.",
                },
                {
                  title: "Next11",
                  url: "https://next11.com",
                  content:
                    "Next11 is sports tracking for coaches and athletes. The company tracks technical, physical and tactical performance and promotes sustainable performance based on data. With Next11 teams and players get live data and video on their performance. On top, it’s the first live football and ice hockey tracking system that is affordable for most teams around the world.",
                },
                {
                  title: "Onomondo",
                  url: "https://onomondo.com",
                  content:
                    "Onomondo enables new and existing IoT solutions to grow with seamless, global cellular connectivity and innovative IoT tools, future-proofing solutions with full data transparency, unparalleled flexibility, and no third parties. In the most basic of terms, we are building a technology stack which merges networks together all over the world, enabling new IoT use cases.",
                },
                {
                  title: "Passendo",
                  url: "https://passendo.com",
                  content:
                    "We believe in the power of email-marketing and have made it our mission to create a tool to empower email communicators all over the world. Our in-email service creates value for both advertisers and marketeers with our unique email ad server and email ad exchange.",
                },
                {
                  title: "Radiobotics",
                  url: "https://radiobotics.com",
                  content:
                    "Where innovation meets radiology. Radiobotics develops AI-driven clinical decision support systems for X-ray analysis which are able to identify radiological findings such as fractures or osteoarthritis within seconds. Radiobotics is reshaping the way medical professionals interpret images, enabling faster diagnoses, reducing errors, and ultimately improving patient outcomes.",
                },
                {
                  title: "Saninudge",
                  url: "https://saninudge.com",
                  content:
                    "In Europe alone, 200,000 patients die from adverse events in healthcare each year. Sani Nudge’s healthcare safety platform help hospitals prevent adverse events in over 15 countries by effectively monitoring hand hygiene compliance, proactively preventing outbreaks, and achieving operational efficiencies through a single, user-friendly platform.",
                },
                {
                  title: "Son of a Tailor",
                  url: "https://sonofatailor.com/?welcome",
                  content:
                    "Son of a Tailor is a clothing-tech company making custom fit garments. Based in Copenhagen and with our own production in Portugal, we’re on a mission to reengineer the clothing industry for the planet and people: our made-to-order model eliminates overproduction for the planet and delivers custom fit for you. With our Perfect Fit Algorithm you can create your custom size in less than 30 seconds.",
                },
                {
                  title: "Spiio",
                  url: "https://spiio.com",
                  content:
                    "Spiio is pioneering a new era in water conservation, precision irrigation and in-ground data. Providing a next-gen irrigation platform enabled by non-invasive in-ground data sensors. Spiio customers receive real-time continuous data insights to optimize irrigation decision-making. Spiio’s mission is to help customers improve playability with the minimum use of water, chemicals, power and labor necessary.",
                },
                {
                  title: "Tiimo",
                  url: "https://tiimoapp.com",
                  content:
                    "Tiimo is the go-to planning app for neurodivergent people worldwide. Structured with neuroinclusivity in mind, Tiimo gives users the flexibility to plan their own way with unique visuals and intuitive customization. Simplify time management with Tiimo, and stay on top of the most hectic days.",
                },
                {
                  title: "Cortium",
                  url: "https://cortrium.com",
                  content:
                    "Cortrium's complete ECG solution from recording to reporting supports today's healthcare challenges by combining novel hardware, advanced AI and real human expertise - for the benefit of patients and doctors. We create efficiency in the health care system and we make ECG easy.",
                },
              ],
            },
          },
          {
            title: "CSR",
            subTitle: "This is CSR",
            content: "Some content",
            url: "https://shot.codes",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "NGUVU",
                  url: "https://nguvu.dk",
                  content:
                    "NGUVU is an amazing project which we admire and support. By drinking coffee from NGUVU you help supporting self-employed female coffee farmers to a higher income and better lives for themselves and their children. And as education is crucial the NGUVU project also help educating the women in development of their production and business.",
                },
              ],
            },
          },
          {
            title: "Equestrian",
            subTitle: "This is Equestrian",
            content: "Some content",
            url: "https://shot.codes",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "Bregnerødgård",
                  url: "https://shot.codes",
                  content: "Some content",
                },
                {
                  title: "Quinta da Várzea",
                  url: "https://qdv.pt",
                  content:
                    "Want to explore the authentic Portugal and still be close to Lisbon? In the beautiful Portuguese landscape you find the Danish run horse farm, Quinta de Várzea. Here you can escape to a memorable getaway were you combine relaxing by the pool and luxury facilities with native life and guided tours. And if you are an equestrian you can also explore Grand Prix level riding on the beautiful Lusitano horses.",
                },
              ],
            },
          },
          {
            title: "Mindfuture",
            subTitle: "This is Mindfuture",
            content: "Some content",
            url: "https://mindfuture.com",
            color: "#0c9493",
            size: 2.5,
            moons: {
              create: [
                {
                  title: "Mindfuture Tech",
                  url: "https://mindfuture.com",
                  content: "Some content",
                },
                {
                  title: "Hub",
                  url: "https://shot.codes",
                  content: "Some content",
                },
                {
                  title: "Life with Artificials",
                  url: "https://shot.codes",
                  content: "Some content",
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.system.create({
    data: {
      name: "dev",
      planets: {
        create: [
          {
            title: "SomeCompany",
            subTitle: "This is SomeCompany",
            content:
              "SomeCompany is a leading space exploration company that is dedicated to pushing the boundaries of human knowledge and technology.\n\n Our team of experienced scientists and engineers are constantly working to develop new and innovative ways to explore the vast expanse of space.",
            url: "https://shot.codes",
            color: "#005067",
            size: 3,
            moons: {
              create: [
                {
                  title: "Phobos",
                  url: "https://shot.codes",
                  content:
                    "SomeCompany is a leading space exploration company that is dedicated to pushing the boundaries of human knowledge and technology. Our team of experienced scientists and engineers are constantly working to develop new and innovative ways to explore the vast expanse of space.",
                },
                {
                  title: "Deimos",
                  url: "https://shot.codes",
                  content:
                    "SomeCompany is a leading space exploration company that is dedicated to pushing the boundaries of human knowledge and technology. Our team of experienced scientists and engineers are constantly working to develop new and innovative ways to explore the vast expanse of space.",
                },
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
