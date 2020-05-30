import { badData } from 'boom';
import { Context } from '@types';

import { Conference } from './conference.model';

export default class ConferenceController {
  /**
   * Get conference by id.
   */
  public static getConference = async (
    ctx: Context,
    { filters = {} }: { filters: Record<string, any> },
  ) => {
    const conference = await Conference.findOne(filters);

    return conference;
  };

  /**
   * Get conferences.
   */
  public static getConferences = async (
    ctx: Context,
    { filters = {} }: { filters: Record<string, any> },
  ) => {
    try {
      const conferences = await Conference.find({
        author: ctx.user._id,
        ...filters,
      });

      return conferences;
    } catch (err) {
      return badData(err);
    }
  };

  /**
   * Create a new conference.
   */
  public static createConference = async (
    ctx: Context,
    data: Record<string, any>,
  ) => {
    try {
      const conference = await Conference.create({
        ...data,
        author: ctx.user._id,
        onboardedSteps: ['basic'],
      });

      return conference;
    } catch (err) {
      return badData(err);
    }
  };
}
