import { MissingVarError } from '@execonline-inc/environment';
import { HttpError } from 'ajaxios';

type SlackNotifierError = HttpError | SlackNotifierRequestFailed;

export type HandlerFail = MissingVarError | SlackNotifierError;

export type SuccessLambdaResult = SlackNotificationSuccess

export interface SlackNotifierRequestFailed {
  kind: 'slack-notifier-request-failed';
  message: string;
}

export const slackNotifierRequestFailed = (err: HttpError): SlackNotifierRequestFailed => ({
  kind: 'slack-notifier-request-failed',
  message: err.kind
});

export interface SlackNotificationSuccess {
  kind: 'slack-notifier-request-succeeded';
  message: unknown;
}

export const slackNotifierRequestSucceded = (s: unknown): SlackNotificationSuccess => ({
  kind: 'slack-notifier-request-succeeded',
  message: s
});

export interface MessageDecoderFailed {
  kind: 'message-decoder-failed';
  message: string;
}

export interface SlackMessage {
  slackChannel: string;
  slackUser: string;
  slackWebhookUrl: string;
  zenQuote: ZenQuote;
}

export interface ZenQuote {
  quote: string;
  author: string;
}
