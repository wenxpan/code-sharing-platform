import { internalMutation } from "./_generated/server"
import { faker } from "@faker-js/faker"

export const seedUsers = internalMutation(async (ctx) => {
  faker.seed()
  for (let i = 0; i < 20; i++) {
    await ctx.db.insert("users", {
      descopeId: faker.string.uuid(),
      name: faker.person.fullName(),
      role: "coder",
      picture: faker.image.avatar(),
      email: faker.internet.email(),
    })
    await ctx.db.insert("users", {
      descopeId: faker.string.uuid(),
      name: faker.person.fullName(),
      role: "businessEmployee",
      company: "ACME",
      picture: faker.image.avatar(),
      email: faker.internet.email(),
    })
  }
})

export const seedProjects = internalMutation(async (ctx) => {
  faker.seed()
  const users = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("role"), "coder"))
    .collect()
  const getRandomUserId = () => {
    const randomIndex = Math.floor(Math.random() * users.length)
    return users[randomIndex]._id
  }
  for (let i = 0; i < 10; i++) {
    await ctx.db.insert("projects", {
      owner: getRandomUserId(),
      allow_forking: true,
      collaborators: [
        {
          avatar_url: faker.image.avatarGitHub(),
          html_url: faker.internet.url(),
          id: faker.number.float(),
          login: faker.internet.userName(),
          role_name: "admin",
        },
      ],
      displayName: faker.word.adjective() + " " + faker.word.noun(),
      full_name: faker.lorem.slug(),
      homepage: faker.internet.url(),
      html_url: faker.internet.url(),
      id: faker.number.float(),
      open_issues: faker.number.int(),
      screenshots: [{ alt: "screenshot for ", url: faker.image.url() }],
      techStack: [{ name: "java" }],
    })
  }
})

export const seedFeedback = internalMutation(async (ctx) => {
  faker.seed()
  const users = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("role"), "coder"))
    .collect()
  const projects = await ctx.db.query("projects").collect()
  const getRandomUserId = () => {
    const randomIndex = Math.floor(Math.random() * users.length)

    return users[randomIndex]._id
  }
  const getRandomProjectId = () => {
    const randomIndex = Math.floor(Math.random() * projects.length)
    return projects[randomIndex]._id
  }
  for (let i = 0; i < 20; i++) {
    await ctx.db.insert("feedback", {
      projectId: getRandomProjectId(),
      postedBy: getRandomUserId(),
      overallFeedback: faker.lorem.paragraph(1),
      positiveFeedback: faker.lorem.paragraph(1),
      specificFeedback: [
        {
          area: "UI",
          feedback: faker.lorem.paragraph(1),
        },
        {
          area: "Code",
          feedback: faker.lorem.paragraph(1),
        },
      ],
    })
  }
})

export const seedJobs = internalMutation(async (ctx) => {
  faker.seed()

  for (let i = 0; i < 20; i++) {
    await ctx.db.insert("jobs", {
      position: faker.person.jobTitle(),
      companyName: faker.company.name(),
      externalPostUrl: "www.seek.com/" + faker.lorem.slug(),
      jobDescription: faker.lorem.paragraph(1),
      email: faker.internet.email(),
      techStack: [
        faker.hacker.noun(),
        faker.hacker.noun(),
        faker.hacker.noun(),
      ],
    })
  }
  for (let i = 0; i < 5; i++) {
    await ctx.db.insert("jobs", {
      position: faker.person.jobTitle(),
      companyName: "ACME",
      externalPostUrl: "www.seek.com/" + faker.lorem.slug(),
      jobDescription: faker.lorem.paragraph(1),
      email: faker.internet.email(),
      techStack: [
        faker.hacker.noun(),
        faker.hacker.noun(),
        faker.hacker.noun(),
      ],
    })
  }
})

export const seedApplication = internalMutation(async (ctx) => {
  faker.seed()
  const users = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("role"), "coder"))
    .collect()
  const projects = await ctx.db.query("projects").collect()
  const jobs = await ctx.db.query("jobs").collect()
  const getRandomUserId = () => {
    const randomIndex = Math.floor(Math.random() * users.length)
    return users[randomIndex]._id
  }
  const getRandomProjectId = () => {
    const randomIndex = Math.floor(Math.random() * projects.length)
    return projects[randomIndex]._id
  }
  const getRandomJobId = () => {
    const randomIndex = Math.floor(Math.random() * projects.length)
    return jobs[randomIndex]._id
  }
  for (let i = 0; i < 50; i++) {
    await ctx.db.insert("applications", {
      jobId: getRandomJobId(),
      applicantId: getRandomUserId(),
      projectId: getRandomProjectId(),
      text: faker.lorem.lines(1),
    })
  }
})
