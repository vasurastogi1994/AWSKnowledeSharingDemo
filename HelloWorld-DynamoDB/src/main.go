package main

import (
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/dynamodb"
    "github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"context"
    "github.com/aws/aws-lambda-go/lambda"
    "fmt"
    "log"
	"os"	
)

type User struct {
    Emailid   string
    Name  string
}

func main() {
            lambda.Start(HandleRequest)
}

func HandleRequest(ctx context.Context, myuser User) (string, error) {
	

   region := os.Getenv("AWS_REGION")
    awsSession, err := session.NewSession(&aws.Config{
        Region: aws.String(region)},
    )
	
    if err != nil {
        return fmt.Sprintf("Error %s!", err ), nil
    }
	
    dynaClient := dynamodb.New(awsSession)
    user := User{
        Emailid:   myuser.Emailid,
        Name:  myuser.Name,
    }

    av, err := dynamodbattribute.MarshalMap(user)
    if err != nil {
        log.Fatalf("Got error marshalling new User item: %s", err)
    }
    tableName := "User"

    input := &dynamodb.PutItemInput{
        Item:      av,
        TableName: aws.String(tableName),
    }

    _, err = dynaClient.PutItem(input)
    if err != nil {
        log.Fatalf("Got error calling PutItem: %s", err)
    }

    // snippet-end:[dynamodb.go.create_item.call]
	
        return fmt.Sprintf("Hello %s!", myuser.Name ), nil
}
// snippet-end:[dynamodb.go.create_item]