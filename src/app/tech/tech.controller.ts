import {
	ConflictTechDtoResponse,
	CreateTechDtoRequest,
	CreateTechDtoResponse,
	DeleteTechDtoResponse,
	FindAllTechDtoQuery,
	FindAllTechDtoResponse,
	FindOneTechDtoResponse,
	NotFoundTechDtoResponse,
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
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() body: CreateTechDtoRequest): Promise<CreateTechDtoResponse> {
		const response = await this.techService.create(body);
		return {
			statusCode: HttpStatus.CREATED,
			message: 'Create tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all tech' })
	@ApiOkResponse({ type: FindAllTechDtoResponse })
	@Get()
	@HttpCode(HttpStatus.OK)
	async findAll(@Query() query: FindAllTechDtoQuery): Promise<FindAllTechDtoResponse> {
		const response = await this.techService.findAll(query);
		return {
			statusCode: HttpStatus.OK,
			message: 'Find all tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one tech' })
	@ApiOkResponse({ type: FindOneTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async findOne(@Param('id') id: string): Promise<FindOneTechDtoResponse> {
		const response = await this.techService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Find one tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update tech' })
	@ApiOkResponse({ type: UpdateTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@ApiConflictResponse({ type: ConflictTechDtoResponse })
	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Param('id') id: string,
		@Body() body: UpdateTechDtoRequest,
	): Promise<UpdateTechDtoResponse> {
		const response = await this.techService.update(id, body);
		return {
			statusCode: HttpStatus.OK,
			message: 'Update tech successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete tech (soft delete)' })
	@ApiOkResponse({ type: DeleteTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async delete(@Param('id') id: string): Promise<DeleteTechDtoResponse> {
		await this.techService.delete(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Delete tech successful',
		};
	}

	@ApiOperation({ summary: 'Restore tech' })
	@ApiOkResponse({ type: DeleteTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@Patch(':id/restore')
	@HttpCode(HttpStatus.OK)
	async restore(@Param('id') id: string): Promise<DeleteTechDtoResponse> {
		await this.techService.restore(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Restore tech successful',
		};
	}

	@ApiOperation({ summary: 'Delete tech (force delete)' })
	@ApiOkResponse({ type: DeleteTechDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundTechDtoResponse })
	@Delete(':id/force')
	@HttpCode(HttpStatus.OK)
	async forceDelete(@Param('id') id: string): Promise<DeleteTechDtoResponse> {
		await this.techService.forceDelete(id);
		return {
			statusCode: HttpStatus.OK,
			message: 'Delete tech successful',
		};
	}
}
