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
