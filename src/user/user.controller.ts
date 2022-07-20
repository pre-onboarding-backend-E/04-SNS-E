import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput } from 'src/auth/dto/login.dto';
import { CurrentUser } from './decorator/currenUser';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(
    readonly userService: UserService, // readonly postService: PostService,
    readonly authService: AuthService,
  ) {
    return this;
  }

  @ApiOperation({
    summary: '로그인 API',
  })
  @Post('/login')
  async getToken(@Body() input: LoginInput): Promise<string> {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );
    return this.authService.generateToken(user);
  }

  @ApiCreatedResponse()
  @ApiOperation({
    summary: '회원가입 API',
  })
  @Post('/user/register')
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input);
  }

  @ApiExcludeEndpoint()
  @Get('/user/:id')
  async user(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOneById(id);
    return user;
  }

  @ApiExcludeEndpoint()
  @Get('/users')
  async users(@Query() query: { take: number; skip: number }): Promise<User[]> {
    return this.userService.find(query.take, query.skip);
  }

  @ApiExcludeEndpoint()
  @Patch('/user')
  async updateUser(
    @CurrentUser() user: User,
    @Body() input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser(user, input);
  }
}