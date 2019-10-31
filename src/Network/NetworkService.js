import RequestService from './RequestService';

class NetworkService {
  
  constructor () {
    this.baseUrl = '',
    this.appKey = ''
  }

  async configuration(options={}) {
    if (!options.baseUrl || !options.appKey) {
      throw "Configure BOS: APP_KEY and BASE_URL.";
    }
    this.baseUrl = await options.baseUrl;
    this.appKey  = await options.appKey;
  }

  signUp(params) {
    var url = `${this.baseUrl}/auth/odata/Users`;
    return RequestService.postRequest(url, this.appKey, params);
  }
  
  login(params) {
    var url = `${this.baseUrl}/auth/odata/Verification?api-version=1.0`;
    return RequestService.postRequest(url, this.appKey, params);
  }

  getUserDetails(email) {
    var url = `${this.baseUrl}/auth/odata/users?$filter=email eq ${"'"}${email}${"'"}`;
    return RequestService.getRequest(url, this.appKey);
  }

  getUserProfileDetails(userId) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.getRequest(url, this.appKey, userId);
  }

  forgotPassword(userId, params) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}/ForcePasswordChange?api-version=1.0` ;
    return RequestService.postRequest(url, this.appKey, params);
  }

  updateUserProfile(userId, params) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}?api-version=1.0`;
    return RequestService.patchRequest(url, this.appKey, params);
  }

  changePassword(userId, params) {
    var url = `${this.baseUrl}/auth/odata/Users${"("}${userId}${")"}/ChangePassword?api-version=1.0`;
    return RequestService.postRequest(url, this.appKey, params);
  }

  sendEmail(params){
    var url = `${this.baseUrl}/email/odata/email`;
    return RequestService.postRequest(url, this.appKey, params);
  }
  
}

export default new NetworkService();
