export interface TokenEncoder {
    generateToken(generateTokenDto: any): Promise<string>
}


export interface TokenDecoder {
    decodeToken(token:string): Promise<any>
}