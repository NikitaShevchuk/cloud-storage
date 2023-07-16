import {
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';

import { JwtGuard } from 'src/auth/guard';
import { FilesService } from './files.service';
import { interceptorOptions } from './interceptor.options';
import { GetUser } from 'src/auth/decorators';
import { GetAllFilesDto } from './dto';

@UseGuards(JwtGuard)
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('all')
  public async getAll(@GetUser('id') userId: number, @Query() filters: GetAllFilesDto) {
    return await this.filesService.getAll(userId, filters);
  }

  @Get('single/:id')
  public async getById(
    @GetUser('id') userId: number,
    @Param('id', { transform: (id) => Number(id) }) id: number,
  ) {
    return await this.filesService.getById(userId, id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', interceptorOptions))
  public async upload(
    @GetUser()
    user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.filesService.upload(user.id, file);
  }
}
