import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CrateDto } from './dto/createUser.dto';
import { loginDTO } from './dto/login.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}

    @Get('/all')
    getAllUsers(){
        return this.UsersService.getAllUsers();
    } 

    @Get('/:id')
    getOneUser(@Param('id',ParseIntPipe) id:number){
        return this.UsersService.getOneUser(id)
    }

    @Post('/create')
    creatUser(@Body() CrateDto:CrateDto){
        return this.UsersService.creatUser(CrateDto)
    }


    @Post('/login')
    async login(@Body() data:loginDTO){
        return this.UsersService.login(data)
    }


    @Put('/:id')
        updatUser(@Param('id',ParseIntPipe) id:number, @Body() data:CrateDto){
        return this.UsersService.updatUser(id,data)
    }

    @Delete('/:id')
    deletUser(@Param('id', ParseIntPipe) id:number){
        return this.UsersService.deletUser(id)
        
    }
}
