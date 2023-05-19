import { faker } from '@faker-js/faker';
import { createUser } from '../src/services/user';
import { createOrganization } from '../src/services/organization';
import { createTeam } from '../src/services/team';

async function main() {
  const length = 3;

  Promise.all(
    Array.from({ length }, async (_, _index) => {
      const organization = await createOrganization({
        name: faker.company.companyName(),
      });

      return organization;
    }),
  );

  Promise.all(
    Array.from({ length }, async (_, _index) => {
      const team = await createTeam({
        name: faker.name.jobArea(),
      });

      return team;
    }),
  );

  Promise.all(
    Array.from({ length }, async (_, _index) => {
      const user = await createUser({
        mail: faker.internet.email(),
        name: faker.name.findName(),
      });

      return user;
    }),
  );
}

main();
