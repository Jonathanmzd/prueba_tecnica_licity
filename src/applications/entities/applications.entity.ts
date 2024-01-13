import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ItemA {
  @Prop({ required: true })
  id_item: string;

  @Prop({ required: true })
  cost_supplier_und: number;
}

@Schema()
export class Applications extends Document {
  @Prop({ required: true })
  id_project: string;

  @Prop({ required: true })
  id_supplier: string;

  @Prop({ type: [ItemA], default: [] })
  items: ItemA[];
}

export const ApplicationsSchema = SchemaFactory.createForClass(Applications);
