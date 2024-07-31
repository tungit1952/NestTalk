import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString({ message: 'Name is string' })
  name: string

  @IsString({ message: 'Description is string' })
  description:string

  @IsString({ message: 'Key is string' })
  @Length(6, 10)
  key:string

  @IsNumber()
  @IsOptional()
  network:number

  @IsNumber()
  @IsOptional()
  status:number

  @IsString()
  @IsOptional()
  avatar: string;
}
