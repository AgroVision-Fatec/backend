import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    bucketPath: string,
    mimeType: string,
  ): Promise<string> {
    const uploadParams = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: bucketPath,
      Body: fileBuffer,
      ContentType: mimeType, // Define o tipo MIME do arquivo
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));
    return `https://${uploadParams.Bucket}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${uploadParams.Key}`;
  }

  async downloadFile(bucketPath: string): Promise<Buffer> {
    const getParams = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Key: bucketPath,
    };

    const { Body } = await this.s3Client.send(new GetObjectCommand(getParams));
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      (Body as Readable).on('data', (chunk) => chunks.push(chunk));
      (Body as Readable).on('end', () => resolve(Buffer.concat(chunks)));
      (Body as Readable).on('error', reject);
    });
  }

  async listFiles(): Promise<string[]> {
    const listParams = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
    };

    const command = new ListObjectsV2Command(listParams);
    const { Contents } = await this.s3Client.send(command);

    return Contents ? Contents.map((file) => file.Key) : [];
  }
}
