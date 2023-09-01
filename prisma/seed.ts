import { getRandomBackgroundUrl } from "../src/common/background-generator";
import {
  encryptData,
  generateNewTokenSecret,
} from "../src/services/sign-hash.service";
import {
  PrismaClient,
  Project,
  ProjectApiKeys,
  ProjectSecrets,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoProjectId = "demo_project_id";

  const demoProject: Project = {
    backgroundUrl: getRandomBackgroundUrl(),
    createdAt: new Date(),
    description: "This is a demo project",
    id: demoProjectId,
    name: "Demo project",
    updatedAt: new Date(),
  };

  const projectSecret = generateNewTokenSecret();
  const hashedSecret = encryptData(demoProjectId, projectSecret);

  const demoProjectSecretId = "demo_project_secret_id";

  const demoProjectSecret: ProjectSecrets = {
    projectId: demoProjectId,
    createdAt: new Date(),
    id: demoProjectSecretId,
    projectSecret,
  };

  const demoProjectApiKeys: ProjectApiKeys = {
    createdAt: new Date(),
    hashedSecret,
    id: "demo_project_api_key_id",
    name: "Demo Project Api Key",
    projectId: demoProjectId,
    projectSecretId: demoProjectSecretId,
  };

  await prisma.project.deleteMany();
  await prisma.projectSecrets.deleteMany();
  await prisma.projectApiKeys.deleteMany();

  await prisma.project.create({ data: demoProject });
  await prisma.projectSecrets.create({ data: demoProjectSecret });
  await prisma.projectApiKeys.create({ data: demoProjectApiKeys });
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(`Error while seeing database ... ${err}`);
  })
  .finally(() => console.log(`Completed seeding the database`));
