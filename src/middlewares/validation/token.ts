/* eslint-disable import/prefer-default-export */

import { celebrate, Joi, Segments } from 'celebrate';

const validateCreateToken = celebrate({
  [Segments.BODY]: Joi.object({
    refreshToken: Joi.string().trim().required(),
  }),
});

export { validateCreateToken };
