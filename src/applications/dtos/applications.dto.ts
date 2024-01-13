import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ItemADto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'id_item' })
  readonly id_item: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'cost_supplier_und' })
  readonly cost_supplier_und: number;
}

export class ApplicationsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'id_project' })
  readonly id_project: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'id_supplier' })
  readonly id_supplier: string;

  @ApiProperty({ description: 'items' })
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => ItemADto)
  readonly items: ItemADto[];
}

export class UpdateApplicationsDto extends PartialType(ApplicationsDto) {}
