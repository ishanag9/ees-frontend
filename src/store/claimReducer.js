//localStorage.removeItem('user')
// let loginUser = JSON.parse(localStorage.getItem("user"));
// const initialState = loginUser
//   ? { loggedIn: true, loginUser, user: null,employees:null }
//   : { user: null ,employees : null};

const initialState = {}

const claimReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
    case "FIND_CLAIMS_BY_EMPLOYEE":
      
      return { claims: payload.claims,alert:state.alert};

      case "FIND_CLAIMS":
      
        return { claims: payload.claims,alert:state.alert};

        case "ADD_EXPENSE_CLAIM":
          return { alert: payload.alert, added: true };

      case "ADD_EXPENSE_CLAIM_FAILED":
          return {
              alert: payload.alert,
          };

          case "RESET_ALERT":
            return { claims: state.claims };

      case "FIND_PROJECTS":
          return { claims: state.claims, projects: payload, expenses: state.expenses }

      case "FIND_EXPENSES":
          return { claims: state.claims, expenses: payload, projects: state.projects }

      case "FIND_EXPENSE_CLAIMS":
          return { claims: payload, expenses: payload, projects: state.projects, message: "", alert: state.alert }

      case "FIND_CLAIM":
          return { claim: payload.claim };

      case "UPDATE_CLAIM":
          return { updated: true, alert: payload.alert };

      case "UPDATE_CLAIM_FAILED":
          return { claim: state.claim, alert: payload.alert };

      case "DELETE_EXPENSE_CLAIM":
          let filteredList = state.claims.filter(
              (claim) => claim.expenseCodeId !== parseInt(payload.id)
          );
          return { claims: filteredList, alert: payload.alert }

      case "DELETE_EXPENSE_CLAIM_FAILED":
          return { claims: state.claims, alert: payload.alert };

      case "APPROVE_CLAIM":
          return { claims: state.claims, alert: payload.alert };

      case "REJECT_CLAIM":
          return { claims: state.claims, alert: payload.alert };


    default:
      return state;
  }
};

export default claimReducer;
