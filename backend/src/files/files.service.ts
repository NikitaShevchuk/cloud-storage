import { Injectable } from '@nestjs/common';
import { UserFile } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllFilesDto } from './dto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  public async getById(userId: number, id: number) {
    return await this.prisma.userFile.findFirst({ where: { id, userId } });
  }

  public async getAll(userId: number, filters: GetAllFilesDto) {
    const { page, search, size } = filters;

    const searchByTitle = search ? { title: search } : {};

    return await this.prisma.userFile.findMany({
      skip: page > 1 ? page * size : 0,
      take: size,
      where: {
        userId,
        ...(searchByTitle ?? {}),
      },
    });
  }

  public async upload(userId: number, file: Express.Multer.File): Promise<UserFile> {
    const { filename: title, size, destination: path } = file;
    const data = { size, title, userId, path };

    const newFile = await this.prisma.userFile.create({ data });

    return newFile;
  }
}
