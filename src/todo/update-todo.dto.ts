import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
