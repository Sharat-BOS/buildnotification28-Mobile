class RequestService {

  getRequest(url, appKey) {

    let data = fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: appKey
      }
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  postRequest(url, appKey, params) {

    let data = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: appKey
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  putRequest(url, appKey, params) {

    let data = fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: appKey
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

  patchRequest(url, appKey, params) {

    let data = fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: appKey
      },
      body: JSON.stringify(params),
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    return data;

  }

}

export default new RequestService();
