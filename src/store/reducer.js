//localStorage.removeItem('user')
let loginUser = JSON.parse(localStorage.getItem("user"));
const initialState = loginUser
  ? { loggedIn: true, loginUser, user: null,employees:null }
  : { user: null ,employees : null};

const reducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case "FIND_Employees":
      let filteredList = payload.employees.filter(
        (emp) => emp.loginDetails.roles[0].name !== 'ROLE_ADMIN'
      );
      return { employees: filteredList, message: "" };

    case "LOGIN_SUCCESS":
      return {
        loggedIn: true,
        loginUser: payload.user,
        alert : payload.alert 
      };

      case "LOGIN_FAILED":
        return {
         
         
          alert : payload.alert
        };
  

    case "LOGOUT_SUCCESS":
      return {
        alert : payload.alert
      };

    case "RESET" :
      return {}  

    case "SIGNUP_SUCCESS":
      return {
        signedUp : payload.signedUp,
        alert: payload.alert,
      };

      case "SIGNUP_FAILED":
      return {
        alert: payload.alert,
      };

    case "DELETE_EMPLOYEE_SUCCESS":
      console.log(payload.id)
      let filtered = state.employees.filter(
        (emp) => emp.empId !== parseInt(payload.id)
      );
      return { employees: filtered, alert: payload.alert };

      case "DELETE_EMPLOYEE_FAILED":
        
        return { employees: state.employees, alert: payload.alert };

        case "FIND_USER":
         
          return { users: state.users, user: payload.user};
    
        case "ADD_USER":
          return { users: state.users, message: payload.message };

    case "UPDATE_USER_SUCCESS":

      return { updated : true, alert : payload.alert };

      case "UPDATE_USER_FAILED":
        
        return { user : state.user, alert : payload.alert };

    default:
      return state;
  }
};

export default reducer;
