export function setAuthToken(authToken){
	localStorage.setItem('authToken', authToken);
}

export function getAuthToken(authToken){
	return localStorage.getItem('authToken');
}

export function removeAuthToken(authToken){
	return localStorage.removeItem('authToken');
}