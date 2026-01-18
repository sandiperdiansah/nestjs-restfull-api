import {
	CreateUserDtoRequest,
	FindAllUserDtoRequest,
	FindOneUserDtoRequest,
	PaginationUserDtoResponse,
	UpdateUserDtoRequest,
} from '@/app/user/dto';
import { UserEntity } from '@/app/user/user.entity';
import { UserRepository } from '@/app/user/user.repository';
import { DefaultWhereSort, DefaultWhereStatus } from '@/default';
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, IsNull, Not } from 'typeorm';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(request: CreateUserDtoRequest): Promise<UserEntity> {
		try {
			await this.conflictUser(request);
			const entity = this.userRepository.create(request);

			Logger.log('USER_SERVICE#CREATE');
			return await this.userRepository.save(entity);
		} catch (error) {
			Logger.error('USER_SERVICE#CREATE', error);
			throw error;
		}
	}

	async findAll(request: FindAllUserDtoRequest): Promise<PaginationUserDtoResponse> {
		try {
			const {
				page = 1,
				limit = 10,
				sort,
				order,
				search,
				filterRole,
				filterEmailVerified,
				filterPhoneVerified,
			} = request;

			const where: FindOptionsWhere<UserEntity>[] = search
				? [
						{ name: ILike(`%${search}%`) },
						{ username: ILike(`%${search}%`) },
						{ email: ILike(`%${search}%`) },
						{ phone: ILike(`%${search}%`) },
					]
				: [{}];

			if (filterRole) {
				where.forEach((user) => {
					user.role = filterRole;
				});
			}

			if (filterEmailVerified) {
				where.forEach((user) => {
					user.emailVerifiedAt =
						filterEmailVerified === DefaultWhereStatus.ACTIVE
							? Not(IsNull())
							: IsNull();
				});
			}

			if (filterPhoneVerified) {
				where.forEach((user) => {
					user.phoneVerifiedAt =
						filterPhoneVerified === DefaultWhereStatus.ACTIVE
							? Not(IsNull())
							: IsNull();
				});
			}

			const [data, count] = await this.userRepository.findAndCount({
				where,
				order: { [sort as DefaultWhereSort]: order },
				skip: (page - 1) * limit,
				take: limit,
			});

			Logger.log('USER_SERVICE#FIND_ALL');

			return {
				meta: {
					page,
					limit,
					count: count,
					pages: Math.ceil(count / limit),
				},
				data,
			};
		} catch (error) {
			Logger.error('USER_SERVICE#FIND_ALL', error);
			throw error;
		}
	}

	async findOne(request: FindOneUserDtoRequest): Promise<UserEntity> {
		try {
			const { id, username, email, phone, withDeleted } = request;
			const where: FindOptionsWhere<UserEntity>[] = [{}];

			if (id) {
				where.forEach((user) => {
					user.id = id;
				});
			}

			if (username) {
				where.forEach((user) => {
					user.username = username;
				});
			}

			if (email) {
				where.forEach((user) => {
					user.email = email;
				});
			}

			if (phone) {
				where.forEach((user) => {
					user.phone = phone;
				});
			}

			const entity = await this.userRepository.findOne({
				where,
				withDeleted,
			});

			if (!entity) {
				throw new NotFoundException('User not found');
			}

			Logger.log('USER_SERVICE#FIND_ONE');
			return entity;
		} catch (error) {
			Logger.error('USER_SERVICE#FIND_ONE', error);
			throw error;
		}
	}

	async update(id: string, request: UpdateUserDtoRequest): Promise<UserEntity> {
		try {
			await this.findOne({ id });
			await this.conflictUser(request);
			await this.userRepository.update(id, request);

			Logger.log('USER_SERVICE#UPDATE');
			return this.findOne({ id });
		} catch (error) {
			Logger.error('USER_SERVICE#UPDATE', error);
			throw error;
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.findOne({ id });
			Logger.log('USER_SERVICE#DELETE');

			await this.userRepository.softDelete(id);
		} catch (error) {
			Logger.error('USER_SERVICE#DELETE', error);
			throw error;
		}
	}

	async restore(id: string): Promise<void> {
		try {
			await this.findOne({ id, withDeleted: true });
			Logger.log('USER_SERVICE#RESTORE');

			await this.userRepository.restore(id);
		} catch (error) {
			Logger.error('USER_SERVICE#RESTORE', error);
			throw error;
		}
	}

	async forceDelete(id: string): Promise<void> {
		try {
			await this.findOne({ id, withDeleted: true });
			Logger.log('USER_SERVICE#FORCE_DELETE');

			await this.userRepository.delete(id);
		} catch (error) {
			Logger.error('USER_SERVICE#FORCE_DELETE', error);
			throw error;
		}
	}

	async conflictUser(request: FindOneUserDtoRequest): Promise<void> {
		const { username, email, phone } = request;
		const where: FindOptionsWhere<UserEntity>[] = [{}];

		if (username) {
			where.forEach((user) => {
				user.username = username;
			});
		}

		if (email) {
			where.forEach((user) => {
				user.email = email;
			});
		}

		if (phone) {
			where.forEach((user) => {
				user.phone = phone;
			});
		}

		const entity = await this.userRepository.findOne({
			where,
		});

		if (entity) {
			throw new ConflictException('User already exists');
		}
	}
}
