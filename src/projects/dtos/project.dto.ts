import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "'Nombre del ítem' item" })
  readonly item: string;

  @IsNotEmpty()
  @ApiProperty({ description: "'Costo Unitario del ítem' cost_und" })
  readonly cost_und: number;
}

class ImgDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "'Nombre del imagen' name_img" })
  readonly name_img: string;

  @IsNotEmpty()
  @ApiProperty({ description: "'url imagen' url" })
  readonly url: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "'Nombre del proyecto' name" })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "'Fecha Inicial del proyecto' initial_date" })
  readonly initial_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "'Fecha Final del proyecto' final_date" })
  readonly final_date: string;

  @ApiProperty({ description: "'Lista de los ítems del proyecto' items" })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  readonly items: ItemDto[];

  @ApiProperty({ description: "'Imagenes' images" })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => ImgDto)
  readonly images: ImgDto[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
