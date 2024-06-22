

import { Document, model, Schema } from 'mongoose';
import mongoose from 'mongoose';
interface Subscriber extends Document {
    email: string;
  }
const subscriberSchema = new Schema<Subscriber>({
    email: { 
        type: String,
        required: true 
    },

  });
  
const SubscriberModel = mongoose.models.Subscriber || model<Subscriber>('Subscriber', subscriberSchema);

export default SubscriberModel;