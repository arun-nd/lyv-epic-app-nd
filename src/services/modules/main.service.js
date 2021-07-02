import { Http } from "../service";
import utils from "../utils";

/**
 * Service extension class
 * @since 1.0.0
 */
export class Main {
  /**
   * get all patient data service method
   * @param {String} params
   * @returns {Promise}
   */
  static async getAllPatient(params) {
    try {
      const response = await new Http({ auth: true }).get(
        `${utils.url.getAllPatient}/${params}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * get all treatment data service method
   * @param {String} params
   * @returns {Promise}
   */
  static async getAllTreatment(params) {
    try {
      const response = await new Http({ auth: true }).get(
        `${utils.url.getAllTreatment}/${params}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * get all condition data service method
   * @param {String} params
   * @returns {Promise}
   */
  static async getAllConditon() {
    try {
      const response = await new Http({ auth: true }).get(
        `${utils.url.getAllCondition}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * get treatment data service method
   * @param {String} params
   * @returns {Promise}
   */
  static async getTreatment(params) {
    try {
      const response = await new Http({ auth: true }).get(
        `${utils.url.getTreatment}/${params}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * get all files data service method
   *
   * @returns {Promise}
   */
  // static async getAllFiles() {
  //   try {
  //     const response = await new Http({ auth: true }).get(
  //       utils.url.getAllFiles
  //     );
  //     return response;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   * save file data service method
   * @param {String} payload
   * @returns {Promise}
   */
  // static async saveFile(payload) {
  //   try {
  //     const response = await new Http({ auth: true }).post(
  //       utils.url.saveFile,
  //       payload
  //     );
  //     return response;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   * reset pass service method
   * @param {Object} data //passsword
   * @returns {Promise}
   */
  // static async changePass(data) {
  //   try {
  //     console.log(data);
  //     const response = await new Http({ auth: true }).put(
  //       utils.url.change_pass,
  //       data
  //     );

  //     return response;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   * condition accepted  service method
   * @returns {Promise}
   */
  // static async acceptedTermsAndCondition() {
  //   try {
  //     const response = await new Http({ auth: true }).put(
  //       utils.url.acceptedTermsAndCondition
  //     );

  //     return response;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  /**
   * get  condition data service method
   * @param {String} params
   * @returns {Promise}
   */
   static async getCondition(params) {
    try {
      const response = await new Http({ auth: true }).get(
        `${utils.url.getCondition}/${params}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

    /**
   * get  condition data service method
   * @param {String} params
   * @returns {Promise}
   */
     static async loadSchema() {
      try {
        const response = await new Http({ auth: true }).get(
          `${utils.url.schema}`
        );
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    }
}
