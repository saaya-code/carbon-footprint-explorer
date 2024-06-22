// app/actions/subscribe.ts
'use server';

import mongoose, { Schema, model, Document } from 'mongoose';
import connectMongo from '@/lib/mongodb';
import sendConfirmationEmail from '@/utils/sendConfirmationEmail';
import SubscriberModel from '@/models/subscriberSchema';

export async function subscribe(email: string): Promise<string> {
  await connectMongo();

  try {
    const existingSubscriber = await SubscriberModel.findOne({ email });
    if (existingSubscriber) {
      throw new Error('Email already subscribed');
    }

    const newSubscriber = new SubscriberModel({ email });
    await newSubscriber.save();

    await sendConfirmationEmail(email);

    return 'Subscription successful. Confirmation email sent.';
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Failed to subscribe. Please try again later.');
  }
}
