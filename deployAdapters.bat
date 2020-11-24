@echo off 
set STACK_NAME=underdog-htf-trollalerting-adapters
set MY_REGION=eu-west-1
set MY_DEV_BUCKET=htf-deploymentbucket2

aws cloudformation package --template templates/event-source-adapters.yaml --s3-bucket %MY_DEV_BUCKET% --output-template export-event-source-adapters.yaml --region %MY_REGION%
sam deploy --region %MY_REGION% --template-file export-event-source-adapters.yaml --stack-name %STACK_NAME% --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Stage=dev
