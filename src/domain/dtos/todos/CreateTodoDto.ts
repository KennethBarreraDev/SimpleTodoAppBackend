export class CreateTodoDto{

    constructor(
        public title: string,
        public content: string
    ){

    }

    public static create(object: {[key:string]: any}): [string?, CreateTodoDto?]{
        const {title, content} = object 
        
        if(!title){
            return ["Please, specify a title", undefined]
        }
        else if(!content){
            return ["Please, specify todo content", undefined]
        }
        else{
            return [undefined, new CreateTodoDto(title, content)]
        }
    }
}