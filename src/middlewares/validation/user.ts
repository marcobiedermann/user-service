import { celebrate, Joi, Segments } from 'celebrate';

const limit = Joi.number().integer().min(0).max(100);
const page = Joi.number().integer().min(0);
const order = Joi.string().valid('ASC', 'DESC').uppercase();
const sort = Joi.string().valid('mail', 'name').lowercase();

const id = Joi.string().guid({
  version: ['uuidv4'],
});
const mail = Joi.string().email().lowercase();
const name = Joi.string().trim();

const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object({
    mail: name.required(),
    name: name.required(),
  }),
});

const validateDeleteUser = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: id.required(),
  }),
});

const validateGetUser = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: id.required(),
  }),
});

const validateGetUsers = celebrate({
  [Segments.QUERY]: Joi.object({
    limit,
    page,
    order,
    sort,
  }).unknown(true),
});

const validateUpdateUser = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: id.required(),
  }),
  [Segments.BODY]: Joi.object({
    mail,
    name,
  }),
});

export {
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateGetUsers,
  validateUpdateUser,
};
