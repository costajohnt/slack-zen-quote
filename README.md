# Slack Zen Quote

Fetches quote of the day from zenquotes.io API and post to Slack on a schedule.

## Development

```bash
yarn
```

### Compiling

```bash
yarn tsc --NoEmit
```

## Invoking the Lambda Function

```bash
yarn tsc && lambda-local -l .build/handler.js -h entry -e src/event.json -E '{"SLACK_CHANNEL":"tech","SLACK_USER":"Zen Quote","SLACK_WEBHOOK_URL":"https://hooks.slack.com/services/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"}'
```

## Deploying

Commits to master trigger build and deploy
