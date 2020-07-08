import { celebrate, Joi, Segments } from 'celebrate';

const limit = Joi.number().integer().min(0).max(100);
const page = Joi.number().integer().min(0);
const order = Joi.string().valid('ASC', 'DESC').uppercase();
const sort = Joi.string().valid('name').lowercase();

const id = Joi.string().guid({
  version: ['uuidv4'],
});
const name = Joi.string().trim();

const validateCreateTeam = celebrate({
  [Segments.BODY]: Joi.object({
    name: name.required(),
  }),
});

const validateDeleteTeam = celebrate({
  [Segments.PARAMS]: Joi.object({
    teamId: id.required(),
  }),
});

const validateGetTeam = celebrate({
  [Segments.PARAMS]: Joi.object({
    teamId: id.required(),
  }),
});

const validateGetTeams = celebrate({
  [Segments.QUERY]: Joi.object({
    limit,
    page,
    order,
    sort,
  }).unknown(true),
});

const validateUpdateTeam = celebrate({
  [Segments.PARAMS]: Joi.object({
    teamId: id.required(),
  }),
  [Segments.BODY]: Joi.object({
    name,
  }),
});

export {
  validateCreateTeam,
  validateDeleteTeam,
  validateGetTeam,
  validateGetTeams,
  validateUpdateTeam,
};
