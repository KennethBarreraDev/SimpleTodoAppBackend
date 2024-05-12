export class UpdateTodoDto {

    constructor(public readonly title: string, public readonly content: string) {

    }

    public static update(object: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { title, content } = object

        if (!title && !content) {
            return ["You must define at least one field", undefined]
        }
        else{
            return [undefined, new UpdateTodoDto(title, content)]
        }
    }

}