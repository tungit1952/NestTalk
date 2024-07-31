import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto {
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
