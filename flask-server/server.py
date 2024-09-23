import os
import io
import logging
import asyncio
from datetime import datetime
from quart import Quart, request, jsonify, send_file, send_from_directory
from quart_cors import cors
from PIL import Image
from transformers import CLIPTokenizer
import torch
import model_loader
import pipeline
import random

logging.basicConfig(level=logging.DEBUG)

app = Quart(__name__)
cors(app, allow_origin="*")

DEVICE = "cpu"
ALLOW_CUDA = True
ALLOW_MPS = False

print("torch init")
if torch.cuda.is_available() and ALLOW_CUDA:
    DEVICE = "cuda"
    print("cuda selected")
elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
    DEVICE = "mps"
print(f"Using device: {DEVICE}")

tokenizer = CLIPTokenizer("./data/vocab.json", merges_file="./data/merges.txt")
print("Model tokenizer")
model_file = "./data/v1-5-pruned-emaonly.ckpt"
models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)
print("model uploaded")
UPLOAD_FOLDER = os.path.join('/media/volume/origami_designs_volume/data/uploads')
print(UPLOAD_FOLDER)
ORIGAMI_IMAGES_FOLDER = os.path.join(app.root_path, 'origami_images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
print(f"Upload folder: {UPLOAD_FOLDER}")

@app.route("/api/generate", methods=['POST'])
async def generate():
    print("request received")
    form = await request.form
    prompt = form.get('prompt')
    negative_prompt = form.get('negativePrompt', "")
    cfg_scale = float(form.get('cfgScale'))
    strength = round(float(form.get('strength')), 1)
    steps = int(form.get('steps'))
    seed = int(form.get('seed'))
    image = (await request.files).get('image')
    
    input_image = None
    if image:
        try:
            image_data = image.read()  # Synchronous read, no 'await'
            input_image = await asyncio.to_thread(Image.open, io.BytesIO(image_data))
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            image_filename = f"{timestamp}.png"
            image_path = os.path.join(UPLOAD_FOLDER, image_filename)
            
            await asyncio.to_thread(input_image.save, image_path)  # Save image asynchronously
            print(f"Image saved at: {image_path}")
        except Exception as e:
            print(f"Error saving image: {e}")
    
    static_suffix = ",Ensure intricate folds and patterns, using a single sheet of paper in a complementary color, ultra sharp, cinematic, 100mm lens, 8k resolution"
    prompt = f"{prompt}, {static_suffix}"
    print("sending to generate of pipeline")

    # The generate function should be asynchronous if it involves I/O-bound tasks
    output_image = await pipeline.generate(
        prompt=prompt,
        uncond_prompt=negative_prompt,
        input_image=input_image,
        strength=strength,
        do_cfg=True,
        cfg_scale=cfg_scale,
        sampler_name="ddpm",
        n_inference_steps=steps,
        seed=random.randint(0, 2**32 - 1),
        models=models,
        device=DEVICE,
        idle_device="cpu",
        tokenizer=tokenizer,
    )

    output_image = Image.fromarray(output_image)
    img_byte_arr = io.BytesIO()
    await asyncio.to_thread(output_image.save, img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return await send_file(img_byte_arr, mimetype='image/png')

@app.route("/api/images", methods=['GET'])
async def list_images():
    image_dir = ORIGAMI_IMAGES_FOLDER
    print(f"Image directory: {image_dir}")
    if not os.path.exists(image_dir):
        print(f"Directory does not exist: {image_dir}")
        return jsonify({"error": "Image directory does not exist"}), 404
    
    images = []
    for filename in os.listdir(image_dir):
        print(f"Found file: {filename}")
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = f"/origami_images/{filename}"
            images.append(image_path)
            print(f"Added image path: {image_path}")
    
    if not images:
        print("No images found in directory.")
    
    return jsonify(images)

@app.route('/origami_images/<path:filename>')
async def serve_origami_image(filename):
    return await send_from_directory(ORIGAMI_IMAGES_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
