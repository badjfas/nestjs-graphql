import { EntitySchema } from 'typeorm';
import { Users } from '../user/entity/user.entity';

export const UserSchema = new EntitySchema<Users>({
  name: 'Users',
  target: Users,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    studentId: {
      type: String,
      nullable: true,
    },
    firstName: {
      type: String,
      nullable: true,
    },
    password: {
      type: String,
    },
    lastName: {
      type: String,
      nullable: true,
    },
    avatar: {
      type: String,
      nullable: true,
      default: '123',
    },

    departmentId: {
      type: String,
      default: '103',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  //   relations: {
  //     photos: {
  //       type: 'one-to-many',
  //       target: 'Photo', // the name of the PhotoSchema
  //     },
  //   },
});
