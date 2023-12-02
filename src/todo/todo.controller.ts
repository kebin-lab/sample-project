import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private prisma: PrismaService) {}

  @Post('')
  async add(@Body() todo: CreateTodoDto) {
    const result = await this.prisma.todo.create({ data: todo });
    console.log(result);
    return {
      status: 'OK',
    };
  }

  @Get('list')
  async getTodo() {
    const todos = await this.prisma.todo.findMany();
    return [...todos];
  }

  @Post(':id/done')
  async done(@Param() param: UpdateTodoDto) {
    const result = await this.prisma.todo.update({
      where: { id: param.id },
      data: { isComplated: true },
    });
    return {
      status: 'OK',
      result,
    };
  }
}
