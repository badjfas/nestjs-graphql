import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Verifications } from '../entities/verification.entitiy';

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verifications, ['code']) {}
