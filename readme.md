1: sudo apt-get update

2: sudo apt-get install nginx

3: sudo nano /etc/nginx/sites-available/dabirrahmani.ir

3.1: add this configuration:

    server {
        listen 80;
        server_name dabirrahmani.ir;
        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

4: sudo ln -s /etc/nginx/sites-available/dabirrahmani.ir /etc/nginx/sites-enabled/dabirrahmani.ir

4.1: remove default site in nginx: sudo rm /etc/nginx/sites-enabled/default

5: sudo nginx -t

6: sudo systemctl restart nginx

6.1: clone repo

7: npm install then npm run start //check if nginx is proxing 80 to 3000

8: (optional) sudo ufw allow 'Nginx Full' allow UFW to permit any data coming through 80 and 443

10: generate private key: openssl genrsa -out dabirrahmani.key 2048

11: generate CSR file with private key: openssl req -new -key dabirrahmani.key -out dabirrahmani.csr

12: sign csr with private key and create crt file. it can be self-signed or sign it with CA

12.1: self sign: openssl x509 -req -days 365 -in dabirrahmani.csr -signkey dabirrahmani.key -out dabirrahmani.crt

12.1.1: sudo mkdir -p /etc/nginx/ssl

12.1.2: sudo mv ~/dabirrahmani.crt /etc/nginx/ssl/

12.1.3: sudo mv ~/dabirrahmani.key /etc/nginx/ssl/

12.1.3: sudo mv ~/dabirrahmani.csr /etc/nginx/ssl/

12.1.4: update nginx configuration file

12.2: sign with lets encrypt:

12.2.1: sudo apt-get install certbot

12.2.2: (for standalone apps like nodejs api we have to use) sudo certbot certonly --standalone -d dabirrahmani.ir -d www.dabirrahmani.ir (port 80 must be down before this command)

13: change nginx conf for dabirrahmani.ir:

    server {
        listen 443 ssl;
        server_name www.dabirrahmani.ir dabirrahmani.ir;

        ssl_certificate /root/0000_cert.pem;
        ssl_certificate_key /home/root/dabirrahmani.key;

        ...
    }

13.1: sudo nginx -t

13.2: sudo systemctl restart nginx

13.3: better to run nodejs apps with pm2

13.3.1: install it using npm install -g pm2

13.3.2: pm2 start npm --name "netengapp" -- start

13.3.3: (add netengapp to start on startup) pm2 startup
