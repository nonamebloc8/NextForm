import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export  class loginDTO{


    @IsString({
        message:"l'email doit etre une chaine de caracter"
    })
    @IsNotEmpty ({
        message:"une emai est requi pour s'inscrire"
    })
    @IsEmail({
        blacklisted_chars :"!#$%^&*()",
    },
    
      {message:"l'adress email n'est pas valide"}
    )
    @MinLength(3)
    email:string





    @IsNotEmpty ({
        message:"un mots de passe  est requi pour s'inscriere"
    })
    @IsString({
        message:'le mots de passe doit etre une chaine de caracter'
    })
    password: string

}