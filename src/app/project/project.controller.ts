import {
	ConflictProjectDtoResponse,
	CreateProjectDtoRequest,
	CreateProjectDtoResponse,
	DeleteProjectDtoResponse,
	FindAllProjectDtoRequest,
	FindAllProjectDtoResponse,
	FindOneProjectDtoResponse,
	NotFoundProjectDtoResponse,
	RestoreProjectDtoResponse,
	UpdateProjectDtoRequest,
	UpdateProjectDtoResponse,
} from '@/app/project/dto';
import { ProjectService } from '@/app/project/project.service';
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

@ApiTags('MS Project')
@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@ApiOperation({ summary: 'Create project' })
	@ApiCreatedResponse({ type: CreateProjectDtoResponse })
	@ApiConflictResponse({ type: ConflictProjectDtoResponse })
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Body() body: CreateProjectDtoRequest,
	): Promise<CreateProjectDtoResponse> {
		const response = await this.projectService.create(body);
		return {
			message: 'Create project successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find all project' })
	@ApiOkResponse({ type: FindAllProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get()
	async findAll(
		@Query() query: FindAllProjectDtoRequest,
	): Promise<FindAllProjectDtoResponse> {
		const response = await this.projectService.findAll(query);
		return {
			message: 'Find all project successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Find one project' })
	@ApiOkResponse({ type: FindOneProjectDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<FindOneProjectDtoResponse> {
		const response = await this.projectService.findOne({ id });
		return {
			message: 'Find one project successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Update project' })
	@ApiOkResponse({ type: UpdateProjectDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundProjectDtoResponse })
	@ApiConflictResponse({ type: ConflictProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateProjectDtoRequest,
	): Promise<UpdateProjectDtoResponse> {
		const response = await this.projectService.update(id, body);
		return {
			message: 'Update project successful',
			data: response,
		};
	}

	@ApiOperation({ summary: 'Delete project (soft delete)' })
	@ApiOkResponse({ type: DeleteProjectDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string): Promise<DeleteProjectDtoResponse> {
		await this.projectService.delete(id);
		return {
			message: 'Delete project successful',
		};
	}

	@ApiOperation({ summary: 'Restore project' })
	@ApiOkResponse({ type: RestoreProjectDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(':id/restore')
	async restore(@Param('id') id: string): Promise<RestoreProjectDtoResponse> {
		await this.projectService.restore(id);
		return {
			message: 'Restore project successful',
		};
	}

	@ApiOperation({ summary: 'Delete project (force delete)' })
	@ApiOkResponse({ type: DeleteProjectDtoResponse })
	@ApiNotFoundResponse({ type: NotFoundProjectDtoResponse })
	@HttpCode(HttpStatus.OK)
	@Delete(':id/force')
	async forceDelete(@Param('id') id: string): Promise<DeleteProjectDtoResponse> {
		await this.projectService.forceDelete(id);
		return {
			message: 'Delete project successful',
		};
	}
}
