import { useCallback } from 'react';

import * as yup from 'yup';

/** Hook gives ability to use Yup validation schema for react hook form
 *
 * @param validationSchema
 */
export const useYupValidationResolver = (validationSchema: yup.AnyObjectSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as yup.ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path || '']: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );
