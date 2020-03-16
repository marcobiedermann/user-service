import { celebrate, Joi, Segments } from 'celebrate';

const validateCreateOrganization = celebrate({
  [Segments.BODY]: Joi.object({
    mail: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

export { validateCreateOrganization };
