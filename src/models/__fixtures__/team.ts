interface Team {
  id: string;
  name: string;
}

type TeamCreationAttributes = Pick<Team, 'name'>;
type TeamUpdateAttributes = Pick<Team, 'name'>;

const team: Team = {
  id: '12345678-9012-3456-7890-123456789012',
  name: 'Marketing',
};

export default team;

export { Team, TeamCreationAttributes, TeamUpdateAttributes };
