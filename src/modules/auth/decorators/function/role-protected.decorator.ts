import { SetMetadata } from '@nestjs/common';
import { user_types } from '../../enums/user_types.enum';

export const META_USER_TYPES = 'user_types';

export const RoleProtected = (...args: user_types[]) => SetMetadata(META_USER_TYPES, args);
