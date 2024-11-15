## Instructions
1. Instance: i-05f65df1033f78875
2. sudo su
3. cd ~/sailingcommittee



`cd /etc/nginx/sites-available`
```
server {
    if ($host = www.racingcommittee.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = racingcommittee.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name www.racingcommittee.com racingcommittee.com ;
    return 404; # managed by Certbot




}

```
