import { readVarT } from '@execonline-inc/environment';
import { get, HttpError, post, toHttpTask } from 'ajaxios';
import Task from 'taskarian';
import { quoteDecoder } from './Decoders';
import {
  HandlerFail,
  SlackMessage,
  SlackNotificationSuccess,
  SlackNotifierRequestFailed,
  slackNotifierRequestFailed,
  slackNotifierRequestSucceded,
  SuccessLambdaResult,
  ZenQuote
} from './Types';

const href: string = 'https://zenquotes.io/api/random';

const getZenQuote = (): Task<HttpError, ZenQuote> =>
  toHttpTask(get(href).withDecoder(quoteDecoder));

const buildRequestT = (slackMessage: SlackMessage): Task<HttpError, unknown> =>
  toHttpTask(
    post(slackMessage.slackWebhookUrl).withData({
      text: slackMessage.zenQuote.quote,
      channel: slackMessage.slackChannel,
      username: slackMessage.slackUser
    })
  );

const postQuoteToSlack = (
  slackMessage: SlackMessage
): Task<SlackNotifierRequestFailed, SlackNotificationSuccess> =>
  buildRequestT(slackMessage)
    .mapError(slackNotifierRequestFailed)
    .map(slackNotifierRequestSucceded);

export const slackZenQuote = (): Task<HandlerFail, SuccessLambdaResult> =>
  Task.succeed<HandlerFail, {}>({})
    .assign('zenQuote', getZenQuote())
    .assign('slackChannel', readVarT('SLACK_CHANNEL'))
    .assign('slackUser', readVarT('SLACK_USER'))
    .assign('slackWebhookUrl', readVarT('SLACK_WEBHOOK_URL'))
    .andThen(postQuoteToSlack);
