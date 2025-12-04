import { BadRequestException, Injectable, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CrateDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginDTO } from './dto/login.dto';
 
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}


    async getAllUsers (){
        return this.prisma.user.findMany();
    }

    async getOneUser ( id: number){
       const users = await this.prisma.user.findUnique({
            where : {id},
            select:{
                id: true,
                firstName:true,
                lastName:true,
                email:true,
                createdAt:true
            }
        });

        if(!users){
            throw new NotFoundException(" Aucun utilisateur nexiste avec cet id !")
        }
        return users;
    }

    async creatUser (data:CrateDto){
        const {firstName, lastName, email, password} = data;

        const UserExiste = await this.prisma.user.findUnique({
            where : {email}
        });
        if (UserExiste) {
            throw new BadRequestException("Cet utilisateur existe déjà");
        }
        const saltRounds =10;
        const hashePassword = await bcrypt.hash(password,saltRounds)


        const user = await this.prisma.user.create({ 
            data:{
                firstName,
                lastName,
                email,
                password:hashePassword
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                createdAt:true
            }
        });
        const payloard =  { sub: user.id, email:user.email}
        const access_token = await this.jwt.signAsync(payloard);
        return {
            user,
            access_token
        }
    }

    async login(data:loginDTO){
        const {email, password} = data;
         const user = await this.prisma.user.findUnique({
            where :{email}
         })
         if (!user){
            throw new UnauthorizedException("Identifient invalide")
         }
         const isPasswordValid =await bcrypt.compare(password, user.password)

         if(!isPasswordValid){ 
            throw new UnauthorizedException("Identifient invalide!")
         }
        const payloard =  { sub: user.id, email:user.email}
        const access_token = await this.jwt.signAsync(payloard);
        return {
            user:{
                id:true,
                firstName:true,
                email:true
            },
            access_token
        }
    }

    async updatUser( id:number,data:CrateDto,){
        const users = await this.prisma.user.findUnique({
            where : {id},
        });

        if(!users){
            throw new NotFoundException(" Aucun utilisateur n'existe avec cet id on ne peux pas le modifier  !")
        }
        return this.prisma.user.update({
            where: {id},
            data
        })
    }

    async deletUser(id:number){
        const users = await this.prisma.user.findUnique({
            where : {id},
        });

        if(!users){
            throw new NotFoundException(" Aucun utilisateur n'existe avec cet id on ne peux pas le suprimer  !")
        }

        return this.prisma.user.delete({
            where :{id}
        })


    }
}


