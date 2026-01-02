import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WhereOrder } from 'src/default';
import { ILike, IsNull } from 'typeorm';
import { CategoryEntity } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { CategoryService } from '../category.service';

describe('CategoryService', () => {
	let service: CategoryService;
	let categoryRepository: CategoryRepository;

	const mockCategoryRepository = {
		create: jest.fn(),
		save: jest.fn(),
		findAndCount: jest.fn(),
		findOne: jest.fn(),
		softDelete: jest.fn(),
		restore: jest.fn(),
		delete: jest.fn(),
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
			providers: [
				CategoryService,
				{
					provide: CategoryRepository,
					useValue: mockCategoryRepository,
				},
			],
		}).compile();

		service = module.get<CategoryService>(CategoryService);
		categoryRepository = module.get<CategoryRepository>(CategoryRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		const createDto = {
			name: 'Test Category',
			slug: 'test-category',
			isActive: true,
		};

		it('should successfully create a category', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(null); // No conflict
			mockCategoryRepository.create.mockReturnValue(mockCategory);
			mockCategoryRepository.save.mockResolvedValue(mockCategory);

			const result = await service.create(createDto);

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { slug: createDto.slug },
			});
			expect(mockCategoryRepository.create).toHaveBeenCalledWith(createDto);
			expect(mockCategoryRepository.save).toHaveBeenCalledWith(mockCategory);
			expect(result).toEqual(mockCategory);
		});

		it('should throw ConflictException if category details already exists', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			await expect(service.create(createDto)).rejects.toThrow(ConflictException);
			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { slug: createDto.slug },
			});
		});
	});

	describe('findAll', () => {
		it('should return an array of categories and count', async () => {
			const query = {
				offset: 0,
				limit: 10,
				search: '',
				sort: 'createdAt',
				order: 'DESC' as WhereOrder,
				page: 1, // Add mock for page
			};

			const expectedResult = [[mockCategory], 1];
			mockCategoryRepository.findAndCount.mockResolvedValue(expectedResult);

			const result = await service.findAll(query);

			expect(mockCategoryRepository.findAndCount).toHaveBeenCalledWith({
				where: [{ deletedAt: IsNull() }],
				skip: query.offset,
				take: query.limit,
				order: { [query.sort]: query.order },
			});
			expect(result).toEqual(expectedResult);
		});

		it('should handle search query', async () => {
			const query = {
				offset: 0,
				limit: 10,
				search: 'test',
				sort: 'createdAt',
				order: 'DESC' as WhereOrder,
				page: 1,
			};

			const expectedResult = [[mockCategory], 1];
			mockCategoryRepository.findAndCount.mockResolvedValue(expectedResult);

			await service.findAll(query);

			expect(mockCategoryRepository.findAndCount).toHaveBeenCalledWith({
				where: [
					{ deletedAt: IsNull(), name: ILike(`%${query.search}%`) },
					{ deletedAt: IsNull(), slug: ILike(`%${query.search}%`) },
				],
				skip: query.offset,
				take: query.limit,
				order: { [query.sort]: query.order },
			});
		});

		it('should calculate offset from page if provided', async () => {
			const query = {
				limit: 10,
				search: '',
				sort: 'createdAt',
				order: 'DESC' as any,
				page: 2, // Requesting page 2 should result in offset 10
			};

			const expectedResult = [[mockCategory], 1];
			mockCategoryRepository.findAndCount.mockResolvedValue(expectedResult);

			await service.findAll(query);

			expect(mockCategoryRepository.findAndCount).toHaveBeenCalledWith({
				where: [{ deletedAt: IsNull() }],
				skip: 10, // (2 - 1) * 10 = 10
				take: 10,
				order: { createdAt: 'DESC' },
			});
		});
	});

	describe('findOne', () => {
		it('should return a category if found', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			const result = await service.findOne('uuid');

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { id: 'uuid' },
				withDeleted: false,
			});
			expect(result).toEqual(mockCategory);
		});

		it('should throw NotFoundException if not found', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(null);

			await expect(service.findOne('uuid')).rejects.toThrow(NotFoundException);
		});

		it('should find with deleted if requested', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			await service.findOne('uuid', { withDeleted: true });

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { id: 'uuid' },
				withDeleted: true,
			});
		});
	});

	describe('update', () => {
		const updateDto = {
			name: 'Updated Name',
		};

		it('should successfully update a category', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
			mockCategoryRepository.save.mockResolvedValue({
				...mockCategory,
				...updateDto,
			});

			const result = await service.update('uuid', updateDto);

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { id: 'uuid' },
				withDeleted: false,
			});
			expect(mockCategoryRepository.save).toHaveBeenCalledWith({
				...mockCategory,
				...updateDto,
			});
			expect(result).toEqual({ ...mockCategory, ...updateDto });
		});

		it('should check for conflict if slug is updated', async () => {
			const updateDtoWithSlug = { slug: 'new-slug' };
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
			// First findOne for 'update' method (getting the entity)
			// Second findOne for 'checkSameCategory' (checking conflict) -> Return null means safe
			mockCategoryRepository.findOne
				.mockResolvedValueOnce(mockCategory)
				.mockResolvedValueOnce(null);

			mockCategoryRepository.save.mockResolvedValue({
				...mockCategory,
				...updateDtoWithSlug,
			});

			await service.update('uuid', updateDtoWithSlug);

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { slug: 'new-slug' },
			});
		});
	});

	describe('delete', () => {
		it('should soft delete a category', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			await service.delete('uuid');

			expect(mockCategoryRepository.softDelete).toHaveBeenCalledWith('uuid');
		});
	});

	describe('restore', () => {
		it('should restore a category', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			await service.restore('uuid');

			expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
				where: { id: 'uuid' },
				withDeleted: true,
			});
			expect(mockCategoryRepository.restore).toHaveBeenCalledWith('uuid');
		});
	});

	describe('forceDelete', () => {
		it('should force delete a category', async () => {
			mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

			await service.forceDelete('uuid');

			expect(mockCategoryRepository.delete).toHaveBeenCalledWith('uuid');
		});
	});
});
