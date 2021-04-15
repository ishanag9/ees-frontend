const initialState = {}

const expenseReducer = (state = initialState, { type, payload }) => {
  //console.log(type);
  switch (type) {
   

    case "FIND_EXPENSES":
     
      return { expenses: payload.expenses , alert: state.alert};

      case "DELETE_EXPENSE_SUCCESS":
        console.log(payload.id)
        let filteredExpenses = state.expenses.filter(
          (exp) => exp.expenseCode !== parseInt(payload.id)
        );
        return { expenses: filteredExpenses, alert: payload.alert };
  
        case "DELETE_EXPENSE_FAILED":
          
          return { expenses: state.expenses, alert: payload.alert };

//
        case "ADD_EXPENSE":
  

        let list=[]

        if(state.expenses)
           list = [...state.expenses , payload.expense]
           else
           list = [payload.expense]
          return {expenses: list,alert:payload.alert,added:true};

      //
      case "ADD_EXPENSE_FAILED":
          
        return { expenses: state.expenses, alert: payload.alert };
      //
      
      case "RESET_ALERT":
        return { expenses: state.expenses };
   
      case "UPDATE_EXPENSE_SUCCESS":
      console.log(payload.id);
      return { expenses: state.expenses , updated : true, alert: payload.alert };


      //
      
      //
      case "UPDATE_EXPENSE_FAILED":
      console.log(payload.id);
      return { expenses: state.expenses, alert: payload.alert };


   

    default:
      return state;
  }
};

export default expenseReducer;