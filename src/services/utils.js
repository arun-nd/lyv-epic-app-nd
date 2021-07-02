/**
 * get local storage method
 * @param {String} key
 */
// const getLocalStoragevalue = (key) => localStorage.getItem(key);

/**
 * set local storage method
 * @param {String} key
 * @param {String} value
 */
// const setLocalStoragevalue = (key, value) => localStorage.setItem(key, value);

/**
 * service urls
 */
const url = {
  /** endpoints */
  getAllPatient: "patient/all/patients",
  getAllTreatment: "treatment/all",
  getAllCondition: "condition/all",
  getTreatment: "treatment",
  // acceptedTermsAndCondition: "users/condition-accepted",
  getCondition:"condition",
  schema:"condition/modules/schema"
};

export default {
  // getLocalStoragevalue,
  // setLocalStoragevalue,
  url,
};
