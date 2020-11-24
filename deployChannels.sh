#!/bin/bash
export STACK_NAME=<underdog>-htf-trollalerting-channels
<<<<<<< HEAD
export MY_REGION=eu-west-1
=======
export MY_REGION=eu-central-1
>>>>>>> 73b65ca666232e4b5877ad387c7b6f3d01d3d0d0
export MY_DEV_BUCKET=htf-deploymentbucket

# Package new cloudformation package
aws cloudformation package --template templates/notification-channel-handlers.yaml --s3-bucket $MY_DEV_BUCKET --output-template export-notification-channel-handlers.yaml --region $MY_REGION
# Deploy 
sam deploy --region $MY_REGION --template-file export-notification-channel-handlers.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Stage=dev