import { Test, TestingModule } from '@nestjs/testing';
import {
	CreateCategoryRequest,
	FindAllCategoryWhereRequest,
	UpdateCategoryRequest,
} from '../category.contract';
import { CategoryController } from '../category.controller';
import { CategoryEntity } from '../category.entity';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
	let controller: CategoryController;
	let service: CategoryService;

	const mockCategoryService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		restore: jest.fn(),
		forceDelete: jest.fn(),
	};

	const mockCategory: CategoryEntity = {
		id: 'uuid',
		name: 'Test Category',
		slug: 'test-category',
		isActive: true,
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{
					provide: CategoryService,
					useValue: mockCategoryService,
				},
			],
		}).compile();

		controller = module.get<CategoryController>(CategoryController);
		service = module.get<CategoryService>(CategoryService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a category', async () => {
			const request: CreateCategoryRequest = {
				name: 'Test Category',
				slug: 'test-category',
				isActive: true,
			};

			mockCategoryService.create.mockResolvedValue(mockCategory);

			const result = await controller.create(request);

			expect(service.create).toHaveBeenCalledWith(request);
			expect(result).toEqual({
				statusCode: 201,
				message: 'create category success',
				data: mockCategory,
			});
		});
	});

	describe('findAll', () => {
		it('should find all categories', async () => {
			const query: FindAllCategoryWhereRequest = {
				page: 1,
				limit: 10,
				offset: 0,
			};
			const expectedData = [mockCategory];
			const total = 1;

			mockCategoryService.findAll.mockResolvedValue([expectedData, total]);

			const result = await controller.findAll(query);

			expect(service.findAll).toHaveBeenCalledWith({
				page: 1,
				limit: 10,
				offset: 0,
			});
			expect(result).toEqual({
				statusCode: 200,
				message: 'find all categories success',
				data: {
					data: expectedData,
					meta: {
						limit: 10,
						offset: 0,
						total,
					},
				},
			});
		});
	});

	describe('findOne', () => {
		it('should find one category', async () => {
			mockCategoryService.findOne.mockResolvedValue(mockCategory);

			const result = await controller.findOne('uuid');

			expect(service.findOne).toHaveBeenCalledWith('uuid');
			expect(result).toEqual({
				statusCode: 200,
				message: 'find one category success',
				data: mockCategory,
			});
		});
	});

	describe('update', () => {
		it('should update a category', async () => {
			const request: UpdateCategoryRequest = {
				name: 'Updated Name',
			};
			const updatedCategory = { ...mockCategory, ...request };

			mockCategoryService.update.mockResolvedValue(updatedCategory);

			const result = await controller.update('uuid', request);

			expect(service.update).toHaveBeenCalledWith('uuid', request);
			expect(result).toEqual({
				statusCode: 200,
				message: 'update category success',
				data: updatedCategory,
			});
		});
	});

	describe('delete', () => {
		it('should soft delete a category', async () => {
			const result = await controller.delete('uuid');

			expect(service.delete).toHaveBeenCalledWith('uuid');
			expect(result).toEqual({
				statusCode: 200,
				message: 'delete category success',
			});
		});
	});

	describe('restore', () => {
		it('should restore a category', async () => {
			const result = await controller.restore('uuid');

			expect(service.restore).toHaveBeenCalledWith('uuid');
			expect(result).toEqual({
				statusCode: 200,
				message: 'restore category success',
			});
		});
	});

	describe('forceDelete', () => {
		it('should force delete a category', async () => {
			const result = await controller.forceDelete('uuid');

			expect(service.forceDelete).toHaveBeenCalledWith('uuid');
			expect(result).toEqual({
				statusCode: 200,
				message: 'force delete category success',
			});
		});
	});
});
