import * as mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

export enum ConferenceType {
  Venue = 'venue',
  Online = 'online',
}

export enum ConferenceDateType {
  Single = 'single',
  Multiple = 'multiple',
}

export enum ConferenceStatus {
  Draft = 'draft',
  Published = 'published',
}

interface ConferenceImage {
  id: string;
  url: string;
}

interface ConferenceFile {
  id: string;
  url: string;
  friendlyName: string;
}

interface ConferenceTicket {
  title: string;
  quantity: number;
  type: string;
  minQuantity: number;
  maxQuantity: number;
  price: number;
  participants: string[];
}

export interface ConferenceModel extends mongoose.Document {
  image: ConferenceImage;
  tickets: ConferenceTicket[];
  description: string;
  summary: string;
  files: ConferenceFile[];
  title: string;
  organizer: string;
  address: string;
  type: ConferenceType;
  dateType: ConferenceDateType;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  author: string;
  status: string;
  onboardedSteps: string[];
}

export const ConferenceSchema = new mongoose.Schema({
  image: {
    id: { type: String, default: null },
    url: { type: String, default: null },
  },
  tickets: [
    {
      title: { type: String, default: null },
      quantity: { type: Number, default: null },
      type: { type: String, default: null },
      minQuantity: { type: Number, default: null },
      maxQuantity: { type: Number, default: null },
      price: { type: Number, default: null },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref: 'User',
        },
      ],
    },
  ],
  description: { type: String, default: null },
  summary: { type: String, default: null },
  files: [
    {
      id: { type: String, default: null },
      url: { type: String, default: null },
      friendlyName: { type: String, default: null },
    },
  ],
  title: { type: String, default: null, required: true },
  organizer: { type: String, default: null, required: true },
  address: { type: String, default: null },
  type: { type: String, default: null },
  dateType: { type: String, default: null },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  startTime: { type: String, default: null },
  endTime: { type: String, default: null },
  author: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'User' },
  status: { type: String, default: ConferenceStatus.Draft },
  onboardedSteps: [{ type: String, default: null }],
});

ConferenceSchema.plugin(timestamps);

export const Conference = mongoose.model<ConferenceModel>(
  'Conference',
  ConferenceSchema,
  'Conference',
);
