// // src/imagens/imagens.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Imagem } from './imagens.entity';

// @Injectable()
// export class ImagensService {
//   constructor(
//     @InjectRepository(Imagem)
//     private imagensRepository: Repository<Imagem>,
//   ) {}

//   async create(createImageDto: any): Promise<Imagem> {
//     return this.imagensRepository.save(createImageDto);
//   }

//   async findByArmadilha(idArmadilha: number): Promise<Imagem[]> {
//     return this.imagensRepository.find({
//       where: { idArmadilha },
//     });
//   }

//   async toggleActive(id: number, flAtivo: boolean): Promise<Imagem> {
//     const imagem = await this.imagensRepository.findOne({ where: { id } });
//     if (!imagem) {
//       throw new Error('Imagem not found');
//     }
//     imagem.flAtivo = flAtivo;
//     return this.imagensRepository.save(imagem);
//   }
// }
