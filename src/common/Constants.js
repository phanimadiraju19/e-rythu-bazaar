/* enums */

// enum for type of the api request to be made
export const ApiRequestTypeEnum = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  });
  
  // enum for the type of the value for a field
  export const ValueTypeEnum = Object.freeze({
    FORM_FIELD: 1,
    VALIDATION_MESSAGE: 2
  });
  
  // enum for the display classname applied to any element
  export const DisplayClassname = Object.freeze({
    DISPLAY_NONE: "dispNone",
    DISPLAY_BLOCK: "dispBlock"
  });
  
  /* constants */
  
  export const LOGIN_CREDENTIALS_ERROR_MSG = "Invalid credentials!";
  export const VALIDATE_CONTACT_ERROR_MSG ="Invalid Contact";
  