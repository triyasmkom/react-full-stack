cd ~/fullstack

git pull

sudo cp -r ./client/build ~/

sudo chown -R www-data:www-data ~/build
sudo chmod -R 755 ~/build

sudo cp -r ~/build/* /var/www/html

sudo rm -rf ~/build
