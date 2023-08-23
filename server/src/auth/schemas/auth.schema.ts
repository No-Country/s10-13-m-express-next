// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type SessionDocument = HydratedDocument<Session>;

// @Schema()
// class SessionData {
//   @Prop({ required: true })
//   userId: string;

//   @Prop({ required: true })
//   email: string;
// }

// @Schema()
// export class Session {
//   @Prop({ required: true })
//   _id: string;

//   @Prop({ required: true })
//   expires: Date;

//   @Prop({ required: true })
//   session: SessionData;
// }

// export const SessionSchema = SchemaFactory.createForClass(Session);
