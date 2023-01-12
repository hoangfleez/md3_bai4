const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer(function(req,res){
    if (req.method=='GET'){
        fs.readFile("./views/input.html",function(err,data){
            res.writeHead(200, {"content-type":"text/html"});
            res.write(data);
            return res.end();
        });
    }else{
        let data = "";
        req.on('data',chunk => {
            data += chunk;
        })
        req.on('end',()=> {
            const userInfo = qs.parse(data);
            console.log(userInfo)
            fs.readFile("./views/display.html",'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                console.log(userInfo)
                datahtml = datahtml.replace('{name}', userInfo.name);
                datahtml = datahtml.replace('{time}', userInfo.time);
                datahtml = datahtml.replace('{place}', userInfo.place);
                datahtml = datahtml.replace('{task}',userInfo.task);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
},);
server.listen(8000,function(){
    console.log('server running at localhost 8000')
})



