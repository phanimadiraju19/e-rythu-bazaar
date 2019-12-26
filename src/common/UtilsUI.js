import * as Constants from "./Constants";
import * as Utils from "./Utils";

/**
 * Function to find the validation message class name for a form field
 * @param value string value for the given enum type
 * @param type enum indicating the form field or the validation message
 * @returns "dispBlock" or "dispNone" based on value and type
 */
export const findValidationMessageClassname = (value, type) => {
  if (type === Constants.ValueTypeEnum.FORM_FIELD) {
    return Utils.isUndefinedOrNullOrEmpty(value)
      ? Constants.DisplayClassname.DISPLAY_BLOCK
      : Constants.DisplayClassname.DISPLAY_NONE;
  } else if (type === Constants.ValueTypeEnum.VALIDATION_MESSAGE) {
    return Utils.isUndefinedOrNullOrEmpty(value)
      ? Constants.DisplayClassname.DISPLAY_NONE
      : Constants.DisplayClassname.DISPLAY_BLOCK;
  }
  return "";
};



