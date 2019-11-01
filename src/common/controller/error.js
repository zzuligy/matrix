'use strict';
/**
 * error controller
 */
export default class extends think.Controller {
  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  displayErrorPage(status) {
    const errorConfig = this.config('error');
    const message = (this.http.error && this.http.error.message) || 'error';
    if (this.isJsonp()) {
      return this.jsonp({
        [errorConfig.key]: status,
        [errorConfig.msg]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }

    let module = 'common';
    if (think.mode !== think.mode_module) {
      module = this.config('default_module');
    }
    const file = `${module}/error/${status}.html`;
    let options = this.config('tpl');
    options = think.extend({}, options, { type: 'ejs', file_depr: '_' });
    return this.display(file, options);
  }
  /**
   * Bad Request
   * @return {Promise} []
   */
  _400Action() {
    return this.displayErrorPage(400);
  }
  /**
   * Forbidden
   * @return {Promise} []
   */
  _403Action() {
    return this.displayErrorPage(403);
  }
  /**
   * Not Found
   * @return {Promise}      []
   */
  _404Action() {
    return this.displayErrorPage(404);
  }
  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action() {
    return this.displayErrorPage(500);
  }
  /**
   * Service Unavailable
   * @return {Promise}      []
   */
  _503Action() {
    return this.displayErrorPage(503);
  }
}
