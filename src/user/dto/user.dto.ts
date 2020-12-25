import { IsNumber, IsOptional, IsString } from 'class-validator';

export class userDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly studentId: string;

  @IsString()
  readonly password: string;
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly avatar: string;

  @IsString()
  readonly createdAt: string;
}
