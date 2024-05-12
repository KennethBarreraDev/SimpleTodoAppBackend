import jsonwebtoken from "jsonwebtoken"


export class JwtAdapter {
    private readonly jwtSeed: string

    constructor(jwtSeed: string) {
        this.jwtSeed = jwtSeed
    }

    generateToken = (payload: any): string => {
        const token = jsonwebtoken.sign(payload, this.jwtSeed,  { expiresIn: '2h' });
        return token
    }


    async verifyToken(token: string): Promise<[Error | null, any]> {
        
        return new Promise((resolve) => {
            jsonwebtoken.verify(token, this.jwtSeed, (err, decoded) => {
                resolve([err, decoded]);
            });
        });
    }
}