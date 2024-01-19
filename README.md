# Bit Frontend

Frontend of the [bit platform](https://github.com/ceticamarco/bit). Written in HTML5+CSS3 and
vanilla Js without any frontend framework or external library. Accessible from [here](https://bit.marcocetica.com).

## Deploy
Before deploying the frontend, be sure to follow the instructions on the [bit backend page](https://github.com/ceticamarco/bit?tab=readme-ov-file#deploy) to install and configure the REST API.
After that, you should have a reverse proxy to the API on the `/api/` path. 

In order to deploy the frontend, extract the static files of this repository on a dedicated web root:
```sh
$> sudo mkdir -p /var/www/bit_frontend
$> sudo cp -R $(ls -A | grep -vE '.git|README.md|LICENSE') /var/www/bit_frontend
```

And then configure nginx as follows:
```nginx
server {
    # ...other settings
    root /var/www/bit_frontend;

    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## License
This software is released under the GPLv3 license. You can find a copy of the license with this
repository or by visiting the [following page](https://choosealicense.com/licenses/gpl-3.0/).