import {
	ConflictUserDtoResponse,
	CreateUserDtoRequest,
	CreateUserDtoResponse,
	DeleteUserDtoResponse,
	FindAllUserDtoRequest,
	FindAllUserDtoResponse,
	FindOneUserDtoResponse,
	NotFoundUserDtoResponse,
	RestoreUserDtoResponse,
	UpdateUserDtoRequest,
	UpdateUserDtoResponse,
} from '@/app/user/dto';
import { UserService } from '@/app/user/user.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import {
	ApiConflictResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiOkResponse({ type: () => CreateUserDtoResponse })
	@ApiConflictResponse({ type: () => ConflictUserDtoResponse })
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() body: CreateUserDtoRequest): Promise<CreateUserDtoResponse> {
		const response = await this.userService.create(body);
		return {
			message: 'Create user successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all user' })
	@ApiOkResponse({ type: () => FindAllUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get()
	async findAll(
		@Query() query: FindAllUserDtoRequest,
	): Promise<FindAllUserDtoResponse> {
		const response = await this.userService.findAll(query);
		return {
			message: 'Find all user successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one user' })
	@ApiOkResponse({ type: () => FindOneUserDtoResponse })
	@ApiNotFoundResponse({ type: () => NotFoundUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindOneUserDtoResponse> {
		const response = await this.userService.findOne({ id });
		return {
			message: 'Find one user successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiOkResponse({ type: () => UpdateUserDtoResponse })
	@ApiNotFoundResponse({ type: () => NotFoundUserDtoResponse })
	@ApiConflictResponse({ type: () => ConflictUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateUserDtoRequest,
	): Promise<UpdateUserDtoResponse> {
		const response = await this.userService.update(id, body);
		return {
			message: 'Update user successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete user (soft delete)' })
	@ApiOkResponse({ type: () => DeleteUserDtoResponse })
	@ApiNotFoundResponse({ type: () => NotFoundUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteUserDtoResponse> {
		await this.userService.delete(id);
		return {
			message: 'Delete user successful',
		};
	}

	@ApiOperation({ summary: 'Restore user' })
	@ApiOkResponse({ type: () => RestoreUserDtoResponse })
	@ApiNotFoundResponse({ type: () => NotFoundUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id/restore')
	async restore(@Param('id') id: string): Promise<RestoreUserDtoResponse> {
		await this.userService.restore(id);
		return {
			message: 'Restore user successful',
		};
	}

	@ApiOperation({ summary: 'Delete user (force delete)' })
	@ApiOkResponse({ type: () => DeleteUserDtoResponse })
	@ApiNotFoundResponse({ type: () => NotFoundUserDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id/force')
	async forceDelete(@Param('id') id: string): Promise<DeleteUserDtoResponse> {
		await this.userService.forceDelete(id);
		return {
			message: 'Delete user successful',
		};
	}
}
