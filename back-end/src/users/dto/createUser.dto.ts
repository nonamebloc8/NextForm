import { IsString, IsOptional,Length, MinLength, isNotEmpty, IsNotEmpty, isEmail, IsEmail } from "class-validator";
// import { blacklist } from "validator";

export class CrateDto{
    @IsString({
        message:'le nom doit etre une chaine de caracter'
    })
    @IsOptional()
    @Length(3,30)
    @IsNotEmpty ({
        message:"un nom est requi pour s'inscrire"
    })
    firstName:string


    @IsString({
        message:'le prenom doit etre une chaine de caracter'
    })
    @IsNotEmpty ({
        message:"un prenom est requi pour s'inscrire"
    })
    @IsOptional()
    @Length(3,30)
    lastName:string
     

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
    @IsOptional()
    @MinLength(3)
    email:string




    @IsNotEmpty ({
        message:"un mots de passe  est requi pour s'inscriere"
    })
    @IsString({
        message:'le mots de passe doit etre une chaine de caracter'
    })
     @MinLength(8, {
        message:"il doit contenir au-moins 8 chaine de caracter."
     })
    password:string
}