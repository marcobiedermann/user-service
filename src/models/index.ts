import { SyncOptions } from 'sequelize';
import Organization from './organization';
import OrganizationUser from './organization-user';
import Team from './team';
import TeamUser from './team-user';
import User from './user';

Organization.belongsToMany(User, {
  through: {
    model: OrganizationUser,
  },
});
Organization.hasMany(OrganizationUser);

Team.belongsToMany(User, {
  through: {
    model: TeamUser,
  },
});
Team.hasMany(TeamUser);

User.belongsToMany(Organization, {
  through: {
    model: OrganizationUser,
  },
});
User.hasMany(OrganizationUser);
User.belongsToMany(Team, {
  through: {
    model: TeamUser,
  },
});
User.hasMany(TeamUser);

OrganizationUser.belongsTo(Organization);
OrganizationUser.belongsTo(User);
TeamUser.belongsTo(Team);
TeamUser.belongsTo(User);

async function sync(options: SyncOptions): Promise<void> {
  await Promise.all([Organization.sync(options), Team.sync(options), User.sync(options)]);
  await Promise.all([OrganizationUser.sync(options), TeamUser.sync(options)]);
}

export { Organization, Team, User, sync };
