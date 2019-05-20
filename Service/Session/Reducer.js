
const initialState ={
	access_token: "",
	
	
	
}
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE':
			return {
				...action.loginData,
			};
			
			case 'CLEAR':
			return{
				...state,
				access_token: ""
			};
			
		default:
			return state;
	}
};
