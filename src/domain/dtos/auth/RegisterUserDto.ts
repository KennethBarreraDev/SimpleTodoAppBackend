export class RegisterUserDto {
    private constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password: string
    ) {
    }

    static create (object: {[key: string]: any}):[string?, RegisterUserDto?]{
     const {name, lastName, email, password} =  object

     if(!name){
        return ["Name is required", undefined]
     }
     if(!lastName){
        return ["Lastname is required", undefined]
     }
     if(!email){
        return ["Email is required", undefined]
     }
     if(!password){
        return ["Password is required", undefined]
     }

  
     if(password.length<6){
        return ["Password size must be greater than 6", undefined]
     }

     if(!String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            return ["Email is invalid", undefined]
        }

        else{
            return [undefined, new RegisterUserDto(name, lastName, email, password)]
        }
    }
}