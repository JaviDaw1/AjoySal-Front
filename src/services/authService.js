export default class authService {
    constructor(){
        this.url = "https://localhost:8080/api/auth"
    }

    async login(user, passoword){
        const loginRequest = {
            user: user,
            passoword: passoword
        }
        const response = await fetch(this.url + "/login", loginRequest)
        return response.json()
    }
}
