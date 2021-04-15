import {portNumber} from '../helpers/port'

const findClaimsByEmployee = (claims) =>{
    return {type : "FIND_CLAIMS_BY_EMPLOYEE",payload : {claims}}
}

export const fetchClaimsByEmployee = (id) => {

    //console.log("fetch user... id = " + id)
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch(`http://localhost:${portNumber}/api/v1/expenseClaims/employee/`+id, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findClaimsByEmployee(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}

const findClaims = (claims) =>{
    return {type : "FIND_CLAIMS",payload : {claims}}
}

export const fetchClaims = () => {

    //console.log("fetch user... id = " + id)
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
    
        'Authorization': 'Bearer ' + user.accessToken

    }
    };
    return dispatch => {
        fetch(`http://localhost:${portNumber}/api/v1/expenseClaims`, requestOptions)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                console.log(data);
                dispatch(findClaims(data));
            }).catch((error) => {
                console.error('Error:', error);
              });

    }

}

export const saveExpenseClaim = (claim) => {
    return { type: "ADD_EXPENSE_CLAIM", payload: { claim, added: true, alert: { type: 'success', message: "Successfully added expense claim" } } }
  }
  
  export const addExpenseClaim = (claim) => {

    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken },
      body: JSON.stringify(claim)
    };
  
    return dispatch => {
      let code = 0;
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim`, requestOptions)
        .then(res => {
          code = res.status
          if (res.status !== 201) {
            return res.text()
          }
          return res.json()
        })
        .then(res => {
          console.log(res)
          if (code === 201)
            dispatch(saveExpenseClaim(res));
          else
            return Promise.reject(res)
        })
        .catch((error) => {
          console.error('Error:', error);
          dispatch({ type: "ADD_EXPENSE_CLAIM_FAILED", payload: { alert: { type: 'error', message: error } } })
        });
    }
  }
  
  
  const findClaim = (claim) => {
    return { type: "FIND_CLAIM", payload: { claim } }
  }
  
  export const fetchClaim = (id) => {

    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken
      }
    };
  
    return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim/` + id, requestOptions)
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          console.log(data);
          dispatch(findClaim(data));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  
  
//   export const findExpenseClaims = (payload) => {
//     return { type: "FIND_EXPENSE_CLAIMS", payload }
//   }
  
//   export const fetchExpenseClaims = () => {
//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + user.accessToken }
//     };
  
//     return dispatch => {
//       fetch('http://localhost:8081/api/v1/expenseClaims/', requestOptions)
//         .then(res => {
//           console.log(res);
//           return res.json();
//         })
//         .then(data => {
//           console.log(data);
//           dispatch(findExpenseClaims(data));
//         }).catch((error) => {
//           console.error('Error:', error);
//         })
//     }
//   }
  
  
  
  
  
  
  
  
  export const updateClaim = (type, alert) => {
    return { type, payload: { alert } }
  }
  
  export const editClaim = (updateRequest) => {
    console.log("claim: " + updateRequest)
    console.log("claim id : " + updateRequest.id)

    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken },
      body: JSON.stringify(updateRequest)
    };
  
    return dispatch => {
      let code = 0
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim/`, requestOptions)
        .then(res => {
          console.log(res);
          code = res.status;
          if (code !== 204) {
            return res.text()
          }
          dispatch(updateClaim('UPDATE_CLAIM', { type: 'success', message: 'Updated claim successfully' }));
          if (user.roles[0] === "ROLE_USER")
          dispatch(fetchClaimsByEmployee(user.id));
        else dispatch(fetchClaims());
        })
        .then(res => {
          if (code !== 204)
            return Promise.reject(res)
        })
        .catch((error) => {
          dispatch(updateClaim('UPDATE_CLAIM_FAILED', { type: 'error', message: error }));
        });
    }
  }
  
  
  const removeExpenseClaim = (id) => {
    return { type: "DELETE_EXPENSE_CLAIM", payload: { id, alert: { type: 'success', message: 'Claim deleted!' } } };
  };
  
  export const deleteExpenseClaim = (id) => {

    let user = JSON.parse(localStorage.getItem('user'));

      console.log('token = ' + user.accessToken )
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.accessToken },
    };
  
    return (dispatch) => {
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim/` + id, requestOptions)
        .then((res) => {
          if (res.status !== 204)
            return Promise.reject("Couldn't delete!");
          dispatch(removeExpenseClaim(id));
        })
        .catch((error) => {
          console.error('Error:', error);
          dispatch({ type: "DELETE_EXPENSE_CLAIM_FAILED", payload: { alert: { type: 'error', message: error } } })
        });
    };
  };
  
  
  export const approveClaim = (id) => {
    return { type: "APPROVE_CLAIM", payload: { id, alert: { type: 'success', message: 'Claim Approved successfully' } } }
  }
  
  export const approvingClaim = (id) => {
    console.log("approve claim id : " + id)

    let user = JSON.parse(localStorage.getItem('user'));

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken },
      body: JSON.stringify(id)
    };
  
    return dispatch => {
      let code = 0
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim/approve/` + id, requestOptions)
        .then(res => {
          console.log(res);
          code = res.status;
          if (code !== 200) {
            return res.text()
          }
          dispatch(approveClaim(id));
           dispatch(fetchClaims());
        })
        .then(res => {
          if (code !== 200)
            return Promise.reject(res)
        })
        .catch((error) => {
          console.log('Error:', error)
        });
    }
  }
  
  
  export const rejectClaim = (id) => {
    return { type: "REJECT_CLAIM", payload: { id, alert: { type: 'success', message: 'Claim Rejected!' } } }
  }
  
  export const rejectingClaim = (id) => {

    let user = JSON.parse(localStorage.getItem('user'));

    console.log("claim id : " + id)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + user.accessToken},
      body: JSON.stringify(id)
    };
  
    return dispatch => {
      let code = 0
      fetch(`http://localhost:${portNumber}/api/v1/expenseClaim/reject/` + id, requestOptions)
        .then(res => {
          console.log(res);
          code = res.status;
          if (code !== 200) {
            return res.text()
          }
          dispatch(rejectClaim(id));
           dispatch(fetchClaims());
        })
        .then(res => {
          if (code !== 200)
            return Promise.reject(res)
        })
        .catch((error) => {
          console.log('Error:', error)
        });
    }
  }