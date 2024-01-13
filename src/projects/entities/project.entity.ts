import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item {
  @Prop({ required: true })
  item: string;

  @Prop({ required: true })
  cost_und: number;
}

@Schema()
export class Img {
  @Prop({ required: true })
  name_img: string;

  @Prop({ required: true })
  url: string;
}

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  initial_date: Date;

  @Prop({ required: true })
  final_date: Date;

  @Prop({ type: [Item], default: [] })
  items: Item[];

  @Prop({ type: [Img], default: [] })
  images: Img[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
