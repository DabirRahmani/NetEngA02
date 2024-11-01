1: sudo apt-get update

2: sudo apt-get install nginx

3: sudo nano /etc/nginx/sites-available/domain.com

4: sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled/domain.com

5: sudo nginx -t

6: sudo systemctl restart nginx

7: npm run start //check if nginx is proxing 80 to 3000

8: sudo ufw allow 'Nginx Full' allow UFW to permit any data coming through 80 and 443

10: generate pricate key: openssl genrsa -out mydomain.key 2048

11: generate CSR file with private key: openssl req -new -key mydomain.key -out mydomain.csr

12: sign csr with private key and create crt file. it can be self-signed or sign it with CA

12.1: self sign: openssl x509 -req -days 365 -in mydomain.csr -signkey mydomain.key -out mydomain.crt

13: change nginx conf for domain.com:

    server {
        listen 443 ssl;
        server_name domain.com;

        ssl_certificate /path/to/mydomain.crt;
        ssl_certificate_key /path/to/mydomain.key;
        ...
    }
