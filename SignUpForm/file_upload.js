var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var AWS = require('aws-sdk');

const BUCKETNAME = 'mdemobucket-vasu';
const LAMBDANAME = 'mdemobucket-vasu';
const accessKeyId = 'XXXXXXXXXXXX';
const accessSecretKey = 'XXXXXXXXXXXXXXXXXXXXXXXX';

const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: accessSecretKey
});

var lambda = new AWS.Lambda({
  accessKeyId: accessKeyId,
  secretAccessKey: accessSecretKey,
  region : 'us-east-2'
});


const uploadFile = async (filePath, fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKETNAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent,
    };

    // Uploading files to the bucket
    var location = await s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
    }).promise();
    return location;    
};

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath =  '/home/ec2-user/temp/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, async function (err) {
        if (err) throw err;

        var location = await uploadFile(newpath,files.filetoupload.name);
        var lambdaReq = {Name:fields.Name,Emailid:fields.Emailid};
        var params = {
          FunctionName: 'GO-HelloWorld',
          Payload: JSON.stringify(lambdaReq)
        };

        lambda.invoke(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });

        res.write('File uploaded and moved!' + location.Location);
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="text" id="Name" name="Name"><br>');
    res.write('<input type="text" id="Emailid" name="Emailid"><br>');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(80);
