import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: '유저 생성 API',
    description: '유저를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '유저 생성 성공',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return {
      userId: user.user_id,
    };
  }

  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: '유저 조회 API',
    description: '유저를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 조회 성공',
  })
  @ApiParam({ name: 'id', required: true, description: '유저 아이디' })
  async getUser(@Param('id') id: number) {
    const user = await this.usersService.getUser(id);
    return { user };
  }
}
