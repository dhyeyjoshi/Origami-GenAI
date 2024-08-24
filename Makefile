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