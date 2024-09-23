from locust import HttpUser, task, between
import os
import random
from io import BytesIO
from PIL import Image

class OrigamiAPILoadTest(HttpUser):
    wait_time = between(1, 5)
    
    # def on_start(self):
    #     """Prepare any data or perform login if required."""
    #     self.image = self._create_random_image()
    
    # def _create_random_image(self):
    #     """Generate a random image for testing."""
    #     img = Image.new('RGB', (128, 128), color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
    #     byte_io = BytesIO()
    #     img.save(byte_io, 'PNG')
    #     byte_io.seek(0)
    #     return byte_io

    # @task(1)
    # def test_generate(self):
    #     """Test the /api/generate endpoint."""
    #     self.image.seek(0)  # Reset image stream position
    #     data = {
    #         'prompt': 'A beautiful origami crane',
    #         'negativePrompt': 'Low resolution',
    #         'cfgScale': '7.5',
    #         'strength': '0.7',
    #         'steps': '50',
    #         'seed': str(random.randint(0, 10000))
    #     }
    #     files = {'image': ('test_image.png', self.image, 'image/png')}
        
    #     with self.client.post("/api/generate", data=data, files=files, catch_response=True) as response:
    #         if response.status_code == 200:
    #             response.success()
    #         else:
    #             response.failure(f"Failed to generate image: {response.status_code}")
    
    @task(2)
    def test_list_images(self):
        """Test the /api/images endpoint."""
        with self.client.get("/api/images", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed to fetch images: {response.status_code}")

# To run this file, use the command:
# locust -f locustfile.py
