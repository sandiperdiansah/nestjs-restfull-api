import { CategoryService } from '@/app/category/category.service';
import {
	ConflictCategoryDtoResponse,
	CreateCategoryDtoRequest,
	CreateCategoryDtoResponse,
	DeleteCategoryDtoResponse,
	FindAllCategoryDtoRequest,
	FindAllCategoryDtoResponse,
	FindOneCategoryDtoResponse,
	NotFoundCategoryDtoResponse,
	RestoreCategoryDtoResponse,
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
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() body: CreateCategoryDtoRequest,
	): Promise<CreateCategoryDtoResponse> {
		const response = await this.categoryService.create(body);
		return {
			message: 'Create category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all category' })
	@ApiOkResponse({ type: FindAllCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get()
	async findAll(
		@Query() query: FindAllCategoryDtoRequest,
	): Promise<FindAllCategoryDtoResponse> {
		const response = await this.categoryService.findAll(query);
		return {
			message: 'Find all category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one category' })
	@ApiOkResponse({ type: FindOneCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindOneCategoryDtoResponse> {
		const response = await this.categoryService.findOne({ id });
		return {
			message: 'Find one category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update category' })
	@ApiOkResponse({ type: UpdateCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@ApiConflictResponse({ type: ConflictCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateCategoryDtoRequest,
	): Promise<UpdateCategoryDtoResponse> {
		const response = await this.categoryService.update(id, body);
		return {
			message: 'Update category successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete category (soft delete)' })
	@ApiOkResponse({ type: DeleteCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteCategoryDtoResponse> {
		await this.categoryService.delete(id);
		return {
			message: 'Delete category successful',
		};
	}

	@ApiOperation({ summary: 'Restore category' })
	@ApiOkResponse({ type: RestoreCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id/restore')
	async restore(@Param('id') id: string): Promise<RestoreCategoryDtoResponse> {
		await this.categoryService.restore(id);
		return {
			message: 'Restore category successful',
		};
	}

	@ApiOperation({ summary: 'Delete category (force delete)' })
	@ApiOkResponse({ type: DeleteCategoryDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundCategoryDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id/force')
	async forceDelete(@Param('id') id: string): Promise<DeleteCategoryDtoResponse> {
		await this.categoryService.forceDelete(id);
		return {
			message: 'Delete category successful',
		};
	}
}
