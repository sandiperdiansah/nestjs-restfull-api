import { CategoryService } from '@/app/category/category.service';
import {
	ConflictCategoryDtoResponse,
	CreateCategoryDtoRequest,
	CreateCategoryDtoResponse,
	DeleteCategoryDtoResponse,
	FindAllCategoryDtoQuery,
	FindAllCategoryDtoResponse,
	FindOneCategoryDtoResponse,
	NotFoundCategoryDtoResponse,
	UpdateCategoryDtoRequest,
	UpdateCategoryDtoResponse,
} from '@/app/category/dto';
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
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags('MS Category')
@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@ApiOperation({ summary: 'Create category' })
	@ApiCreatedResponse({ type: CreateCategoryDtoResponse })
	@ApiConflictResponse({ type: ConflictCategoryDtoResponse })
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() body: CreateCategoryDtoRequest,
	): Promise<CreateCategoryDtoResponse> {
		const response = await this.categoryService.create(body);
		return {
			statusCode: HttpStatus.CREATED,
			message: 'Create category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all category' })
	@ApiOkResponse({ type: FindAllCategoryDtoResponse })
	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll(
		@Query() query: FindAllCategoryDtoQuery,
	): Promise<FindAllCategoryDtoResponse> {
		const response = await this.categoryService.findAll(query);
		return {
			statusCode: HttpStatus.OK,
			message: 'Find all category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one category' })
	@ApiOkResponse({ type: FindOneCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async findOne(@Param('id') id: string): Promise<FindOneCategoryDtoResponse> {
		const response = await this.categoryService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Find one category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update category' })
	@ApiOkResponse({ type: UpdateCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@ApiConflictResponse({ type: ConflictCategoryDtoResponse })
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Param('id') id: string,
		@Body() body: UpdateCategoryDtoRequest,
	): Promise<UpdateCategoryDtoResponse> {
		const response = await this.categoryService.update(id, body);
		return {
			statusCode: HttpStatus.OK,
			message: 'Update category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete category (soft delete)' })
	@ApiOkResponse({ type: DeleteCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async delete(@Param('id') id: string): Promise<DeleteCategoryDtoResponse> {
		await this.categoryService.delete(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Delete category successful',
		};
	}

	@ApiOperation({ summary: 'Restore category' })
	@ApiOkResponse({ type: DeleteCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@Patch(':id/restore')
	@HttpCode(HttpStatus.OK)
	async restore(@Param('id') id: string): Promise<DeleteCategoryDtoResponse> {
		await this.categoryService.restore(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Restore category successful',
		};
	}

	@ApiOperation({ summary: 'Delete category (force delete)' })
	@ApiOkResponse({ type: DeleteCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@Delete(':id/force')
	@HttpCode(HttpStatus.OK)
	async forceDelete(@Param('id') id: string): Promise<DeleteCategoryDtoResponse> {
		await this.categoryService.forceDelete(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Delete category successful',
		};
	}
}
