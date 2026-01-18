import {
	ConflictTechDtoResponse,
	CreateTechDtoRequest,
	CreateTechDtoResponse,
	DeleteTechDtoResponse,
	FindAllTechDtoRequest,
	FindAllTechDtoResponse,
	FindOneTechDtoResponse,
	NotFoundTechDtoResponse,
	RestoreTechDtoResponse,
	UpdateTechDtoRequest,
	UpdateTechDtoResponse,
} from '@/app/tech/dto';
import { TechService } from '@/app/tech/tech.service';
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

@ApiTags('MS Tech')
@Controller('techs')
export class TechController {
	constructor(private readonly techService: TechService) {}

	@ApiOperation({ summary: 'Create tech' })
	@ApiCreatedResponse({ type: CreateTechDtoResponse })
	@ApiConflictResponse({ type: ConflictTechDtoResponse })
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() body: CreateTechDtoRequest): Promise<CreateTechDtoResponse> {
		const response = await this.techService.create(body);
		return {
			message: 'Create tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all tech' })
	@ApiOkResponse({ type: FindAllTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get()
	async findAll(
		@Query() query: FindAllTechDtoRequest,
	): Promise<FindAllTechDtoResponse> {
		const response = await this.techService.findAll(query);
		return {
			message: 'Find all tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one tech' })
	@ApiOkResponse({ type: FindOneTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindOneTechDtoResponse> {
		const response = await this.techService.findOne({ id });
		return {
			message: 'Find one tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update tech' })
	@ApiOkResponse({ type: UpdateTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@ApiConflictResponse({ type: ConflictTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateTechDtoRequest,
	): Promise<UpdateTechDtoResponse> {
		const response = await this.techService.update(id, body);
		return {
			message: 'Update tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete tech (soft delete)' })
	@ApiOkResponse({ type: DeleteTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteTechDtoResponse> {
		await this.techService.delete(id);
		return {
			message: 'Delete tech successful',
		};
	}

	@ApiOperation({ summary: 'Restore tech' })
	@ApiOkResponse({ type: RestoreTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id/restore')
	async restore(@Param('id') id: string): Promise<RestoreTechDtoResponse> {
		await this.techService.restore(id);
		return {
			message: 'Restore tech successful',
		};
	}

	@ApiOperation({ summary: 'Delete tech (force delete)' })
	@ApiOkResponse({ type: DeleteTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id/force')
	async forceDelete(@Param('id') id: string): Promise<DeleteTechDtoResponse> {
		await this.techService.forceDelete(id);
		return {
			message: 'Delete tech successful',
		};
	}
}
