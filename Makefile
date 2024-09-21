#	sudo nano /etc/systemd/system/FoldArt.service
start:
	sudo bash -c 'cat FoldArt.service.txt > /etc/systemd/system/FoldArt.service'
	sudo systemctl daemon-reload
	sudo systemctl restart FoldArt
	sudo systemctl status FoldArt.service 
	
# Monitor Logs
logs:
	sudo journalctl -xeu FoldArt -f

# Show GPU Memory Usage
gpu:
	nvitop
# nvidia-smi  alternate command for reference



# To start the nginx server

# sudo systemctl reload nginx
# npm run build
# sudo cp -r dist/* /var/www/FoldArt
# sudo systemctl restart nginx
