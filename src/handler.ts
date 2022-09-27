import Task from 'taskarian';
import { slackZenQuote } from './SlackZenQuote';

function toPromise<E, T>(task: Task<E, T>) {
  return new Promise<T>((resolve, reject) => task.fork(reject, resolve));
}

export const entry = async () => {
  return toPromise(slackZenQuote());
};
