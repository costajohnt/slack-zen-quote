FROM public.ecr.aws/lambda/nodejs:16
COPY . ${LAMBDA_TASK_ROOT}
RUN npm install
ENV SLACK_CHANNEL="#tech"
ENV SLACK_USER="Zen Quote"
ENV SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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"
CMD [ ".build/handler.entry" ] 