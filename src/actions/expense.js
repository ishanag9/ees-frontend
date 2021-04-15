import {portNumber} from '../helpers/port'


// export const findExpenses = (expenses) => {
//     return { type: "FIND_EXPENSES", payload : {expenses}}
//   }
  
//   export const fetchExpenses = () => {

//     const user = JSON.parse(localStorage.getItem('user'));

//     const requestOptions = {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + user.accessToken }
//     };
  
//     return dispatch => {
//       fetch(`http://localhost:${portNumber}/api/v1/expenses/`, requestOptions)
//         .then(res => {
//           console.log(res);
//           return res.json();
//         })
//         .then(data => {
//           console.log(data);
//           dispatch(findExpenses(data));
//         })
//     }
//   }


const findExpense = (expense) =>{
  return {type : "FIND_EXPENSE",payload : {expense}}
}

export const fetchExpense = (id) => {

  console.log("inside fetchExpense... id = " + id)
  // let project = JSON.parse(localStorage.getItem('project'));
  // console.log(project)

  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
  
       'Authorization': 'Bearer ' + user.accessToken

  }
  };
  return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/expense/`+id, requestOptions)
          .then(res => {
              console.log(res);
              return res.json();
          })
          .then(data => {
              console.log(data);
              dispatch(findExpense(data));
          }).catch((error) => {
              console.error('Error:', error);
            });

  }

}

// const updateExpense = () =>{
//     return {type : "UPDATE_EXPENSE",payload : {message : 'Updated Successfully'}}
// }


//
const updateExpense = () =>{
  return {type : "UPDATE_EXPENSE_SUCCESS",payload : {alert:{type : 'success',message : 'Expense updated successfully!'}}}
  // return {type : "UPDATE_PROJECT_SUCCESS", payload : {message : 'Project updated successfully!'}}
}

export const editExpense = (updateRequest) => {

  // console.log("inside fetch project... id = ")
  // let user = JSON.parse(localStorage.getItem('project'));
  // console.log(project)
  
  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      
       'Authorization': 'Bearer ' + user.accessToken

  },
  body : JSON.stringify(updateRequest)  
  };
  return dispatch => {
      let code = 0
      fetch(`http://localhost:${portNumber}/api/v1/expense/`, requestOptions)
      .then(res => {
          console.log(res);
          //console.log(res.message);
          code = res.status
          if(code!==204)
          {
              return res.text()
          }
          dispatch(updateExpense());
          dispatch(fetchExpenses());
      })
          .then(res => {
              console.log(res);
              if(code!==204)
              {
                  return Promise.reject(res)
              }  
          })
          .catch((error) => {
              console.error('Error:', error);
              dispatch({type : "UPDATE_EXPENSE_FAILED",payload : {alert:{type : 'error',message : error}}})
            });
          
  }

}

//

const removeExpense = (id) =>{
  return {type : "DELETE_EXPENSE_SUCCESS",payload : {id,alert:{type : 'success',message : 'Expense deleted!'}}}
}

export const deleteExpense = (id) => {

  // console.log("inside delete project... id = " + id)
  // let user = JSON.parse(localStorage.getItem('project'));
  // console.log(project)

  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
  
       'Authorization': 'Bearer ' + user.accessToken

  }
  };
  return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/expense/`+id, requestOptions)
          .then(res => {
              console.log(res);
              if(res.status!==204)
              return Promise.reject("Couldn't delete!");
              dispatch(removeExpense(id));
          })
          .catch((error) => {
              console.error('Error:', error);
              dispatch({type : "DELETE_EXPENSE_FAILED",payload : {alert:{type : 'error',message : error}}})
            });

  }

}

const findExpenses = (expenses) =>{
  return {type : "FIND_EXPENSES",payload : {expenses}}
}

export const fetchExpenses = () => {

  //console.log("fetch expense... id = " + id)
  // let user = JSON.parse(localStorage.getItem('user'));
  // console.log(user)

  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
  
       'Authorization': 'Bearer ' + user.accessToken

  }
  };
  return dispatch => {
      fetch(`http://localhost:${portNumber}/api/v1/expenses`, requestOptions)
          .then(res => {
              console.log(res);
              return res.json();
          })
          .then(data => {
              console.log(data);
              dispatch(findExpenses(data));
          }).catch((error) => {
              console.error('Error:', error);
            });

  }

}

//

// Saving adding expense

const saveExpense = (expense) =>{
  return {type : "ADD_EXPENSE",payload : {expense : expense, alert:{type : 'success',message : 'Expense added successfully!'}}}
}

export const addExpense = (payload) => {

  // console.log("adding project")

  const user = JSON.parse(localStorage.getItem('user'));

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.accessToken },
      body : JSON.stringify(payload)
  };

  return dispatch => {
      let code = 0
      fetch(`http://localhost:${portNumber}/api/v1/expense`, requestOptions)
          .then(res => {
              console.log(res);
              //console.log(res.message);
              code = res.status
              if(res.status!==201)
              {
                  return res.text()
              }
              return res.json();
          })
          .then(res => {  
              console.log(res);
              if(code === 201){
                  console.log("expense added successfully");
                  dispatch(saveExpense(res))  
              }   
                 
              else{
                  return Promise.reject(res)
              }       
          })
          
          .catch((error) => {
              console.error('Error:', error);
              dispatch({type : "ADD_EXPENSE_FAILED",payload : {alert : {type : 'error',message : error}}})
            });

  }

}
