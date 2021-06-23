# AWSKnowledeSharingDemo
1. Create a KeyPair with ppk format
2. Launch EC2 Instance
3. INSTALL NODE - 

		sudo su
		curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
		. ~/.nvm/nvm.sh
		nvm install node
		node -e "console.log('Running Node.js ' + process.version)"
		
4. Create HelloWorld Directory and paste main.js
5. Launch the project using command ->  
 		node main.js
6. Create S3 Bucket
7. Create User with programmatic AWS Access Keys with access to S3 and Lambda
8. Deploy Signup form in EC2 instance - Change Keys, Region, BucketName
