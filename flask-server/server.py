# import io
# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from PIL import Image
# from transformers import CLIPTokenizer
# import torch
# import model_loader
# import pipeline

# app = Flask(__name__)
# CORS(app, origins="*")

# DEVICE = "cpu"
# ALLOW_CUDA = False
# ALLOW_MPS = False

# if torch.cuda.is_available() and ALLOW_CUDA:
#     DEVICE = "cuda"
# elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
#     DEVICE = "mps"
# print(f"Using device: {DEVICE}")

# tokenizer = CLIPTokenizer("./data/vocab.json", merges_file="./data/merges.txt")
# model_file = "./data/v1-5-pruned-emaonly.ckpt"
# models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

# @app.route("/api/generate", methods=['POST'])
# def generate():
#     prompt = request.form.get('prompt')
#     negative_prompt = request.form.get('negativePrompt', "")
#     cfg_scale = float(request.form.get('cfgScale'))
#     strength = float(request.form.get('strength'))
#     steps = int(request.form.get('steps'))
#     seed = int(request.form.get('seed'))
#     image = request.files.get('image')
    
#     input_image = None
#     if image:
#         input_image = Image.open(io.BytesIO(image.read()))
    
#     static_suffix = ",Ensure origami have intricate folds and patterns, using a single sheet of paper in a complementary color,ultra sharp, cinematic, 100mm lens, 8k resolution"
#     prompt = f"{prompt}, {static_suffix}"

#     output_image = pipeline.generate(
#         prompt=prompt,
#         uncond_prompt=negative_prompt,
#         input_image=input_image,
#         strength=strength,
#         do_cfg=True,
#         cfg_scale=cfg_scale,
#         sampler_name="ddpm",
#         n_inference_steps=steps,
#         seed=seed,
#         models=models,
#         device=DEVICE,
#         idle_device="cpu",
#         tokenizer=tokenizer,
#     )

#     output_image = Image.fromarray(output_image)
#     img_byte_arr = io.BytesIO()
#     output_image.save(img_byte_arr, format='PNG')
#     img_byte_arr.seek(0)

#     return send_file(img_byte_arr, mimetype='image/png')

# if __name__ == "__main__":
#     app.run(debug=False, port=8080)

##################################################### ADDED FEATURE TO STORE IMAGE IN UPLOADS FOLDER #################################

# import os
# import io
# from datetime import datetime
# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from PIL import Image
# from transformers import CLIPTokenizer
# import torch
# import model_loader
# import pipeline

# app = Flask(__name__)
# CORS(app, origins="*")

# DEVICE = "cpu"
# ALLOW_CUDA = False
# ALLOW_MPS = False

# if torch.cuda.is_available() and ALLOW_CUDA:
#     DEVICE = "cuda"
# elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
#     DEVICE = "mps"
# print(f"Using device: {DEVICE}")

# tokenizer = CLIPTokenizer("./data/vocab.json", merges_file="./data/merges.txt")
# model_file = "./data/v1-5-pruned-emaonly.ckpt"
# models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

# # Update the upload folder path to match your mount point
# UPLOAD_FOLDER = './uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# print(f"Upload folder: {UPLOAD_FOLDER}")

# @app.route("/api/generate", methods=['POST'])
# def generate():
#     prompt = request.form.get('prompt')
#     negative_prompt = request.form.get('negativePrompt', "")
#     cfg_scale = float(request.form.get('cfgScale'))
#     strength = float(request.form.get('strength'))
#     steps = int(request.form.get('steps'))
#     seed = int(request.form.get('seed'))
#     image = request.files.get('image')
    
#     input_image = None
#     if image:
#         try:
#             input_image = Image.open(io.BytesIO(image.read()))
#             # Save the uploaded image with a timestamp
#             timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
#             image_filename = f"{timestamp}.png"
#             image_path = os.path.join(UPLOAD_FOLDER, image_filename)
#             input_image.save(image_path)
#             print(f"Image saved at: {image_path}")
#         except Exception as e:
#             print(f"Error saving image: {e}")
    
#     static_suffix = ",Ensure origami have intricate folds and patterns, using a single sheet of paper in a complementary color,ultra sharp, cinematic, 100mm lens, 8k resolution"
#     prompt = f"{prompt}, {static_suffix}"

#     output_image = pipeline.generate(
#         prompt=prompt,
#         uncond_prompt=negative_prompt,
#         input_image=input_image,
#         strength=strength,
#         do_cfg=True,
#         cfg_scale=cfg_scale,
#         sampler_name="ddpm",
#         n_inference_steps=steps,
#         seed=seed,
#         models=models,
#         device=DEVICE,
#         idle_device="cpu",
#         tokenizer=tokenizer,
#     )

#     output_image = Image.fromarray(output_image)
#     img_byte_arr = io.BytesIO()
#     output_image.save(img_byte_arr, format='PNG')
#     img_byte_arr.seek(0)

#     return send_file(img_byte_arr, mimetype='image/png')

# if __name__ == "__main__":
#     app.run(debug=False, port=8080)

################################################ ADDED A FEATURE TO GET THE IMAGE FROM ORIGAMI_IMAGE FOLDER #################################################

# import os
# import io
# import logging
# logging.basicConfig(level=logging.DEBUG)
# from datetime import datetime
# from flask import Flask, request, jsonify, send_file, send_from_directory
# from flask_cors import CORS
# from PIL import Image
# from transformers import CLIPTokenizer
# import torch
# import model_loader
# import pipeline

# app = Flask(__name__)
# CORS(app, origins="*")

# DEVICE = "cpu"
# ALLOW_CUDA = True
# ALLOW_MPS = False

# if torch.cuda.is_available() and ALLOW_CUDA:
#     DEVICE = "cuda"
# elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
#     DEVICE = "mps"
# print(f"Using device: {DEVICE}")

# tokenizer = CLIPTokenizer("./data/vocab.json", merges_file="./data/merges.txt")
# model_file = "./data/v1-5-pruned-emaonly.ckpt"
# models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

# UPLOAD_FOLDER = os.path.join(app.root_path, '/media/volume/origami_designs_volume/data/uploads')
# ORIGAMI_IMAGES_FOLDER = os.path.join(app.root_path, 'origami_images')
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# print(f"Upload folder: {UPLOAD_FOLDER}")

# @app.route("/api/generate", methods=['POST'])
# def generate():
#     prompt = request.form.get('prompt')
#     negative_prompt = request.form.get('negativePrompt', "")
#     cfg_scale = float(request.form.get('cfgScale'))
#     strength = float(request.form.get('strength'))
#     steps = int(request.form.get('steps'))
#     seed = int(request.form.get('seed'))
#     image = request.files.get('image')
    
#     input_image = None
#     if image:
#         try:
#             input_image = Image.open(io.BytesIO(image.read()))
#             timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
#             image_filename = f"{timestamp}.png"
#             image_path = os.path.join(UPLOAD_FOLDER, image_filename)
#             input_image.save(image_path)
#             print(f"Image saved at: {image_path}")
#         except Exception as e:
#             print(f"Error saving image: {e}")
    
#     static_suffix = ",origami, made with paper sheets,ultra sharp, cinematic, 1000mm lens, 8k resolution"
#     prompt = f"{prompt}, {static_suffix}"

#     output_image = pipeline.generate(
#         prompt=prompt,
#         uncond_prompt=negative_prompt,
#         input_image=input_image,
#         strength=strength,
#         do_cfg=True,
#         cfg_scale=cfg_scale,
#         sampler_name="ddpm",
#         n_inference_steps=steps,
#         seed=seed,
#         models=models,
#         device=DEVICE,
#         idle_device="cpu",
#         tokenizer=tokenizer,
#     )

#     output_image = Image.fromarray(output_image)
#     img_byte_arr = io.BytesIO()
#     output_image.save(img_byte_arr, format='PNG')
#     img_byte_arr.seek(0)

#     return send_file(img_byte_arr, mimetype='image/png')

# @app.route("/api/images", methods=['GET'])
# def list_images():
#     image_dir = ORIGAMI_IMAGES_FOLDER
#     print(f"Image directory: {image_dir}")
#     if not os.path.exists(image_dir):
#         print(f"Directory does not exist: {image_dir}")
#         return jsonify({"error": "Image directory does not exist"}), 404
    
#     images = []
#     for filename in os.listdir(image_dir):
#         print(f"Found file: {filename}")
#         if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
#             image_path = f"/origami_images/{filename}"
#             images.append(image_path)
#             print(f"Added image path: {image_path}")
    
#     if not images:
#         print("No images found in directory.")
    
#     return jsonify(images)

# @app.route('/origami_images/<path:filename>')
# def serve_origami_image(filename):
#     return send_from_directory(ORIGAMI_IMAGES_FOLDER, filename)

# if __name__ == "__main__":
#     app.run(debug=True, port=8080)

#################################################3 Latest Release #################################################

import os
import io
import logging
logging.basicConfig(level=logging.DEBUG)
from datetime import datetime
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from PIL import Image
from transformers import CLIPTokenizer
import torch
import model_loader
import pipeline
import random  # Import random module for generating random seed


app = Flask(__name__)
CORS(app, origins="*")

DEVICE = "cpu"
ALLOW_CUDA = True
ALLOW_MPS = False

if torch.cuda.is_available() and ALLOW_CUDA:
    DEVICE = "cuda"
elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
    DEVICE = "mps"
print(f"Using device: {DEVICE}")

tokenizer = CLIPTokenizer("./data/vocab.json", merges_file="./data/merges.txt")
model_file = "./data/v1-5-pruned-emaonly.ckpt"
models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

UPLOAD_FOLDER = os.path.join(app.root_path, '/media/volume/origami_designs_volume/data/uploads')
ORIGAMI_IMAGES_FOLDER = os.path.join(app.root_path, 'origami_images')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
print(f"Upload folder: {UPLOAD_FOLDER}")

@app.route("/api/generate", methods=['POST'])
def generate():
    prompt = request.form.get('prompt')
    negative_prompt = request.form.get('negativePrompt', "")
    cfg_scale = float(request.form.get('cfgScale'))
    strength = round(float(request.form.get('strength')), 1)
    steps = int(request.form.get('steps'))
    seed = int(request.form.get('seed'))
    image = request.files.get('image')
    
    input_image = None
    if image:
        try:
            input_image = Image.open(io.BytesIO(image.read()))
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            image_filename = f"{timestamp}.png"
            image_path = os.path.join(UPLOAD_FOLDER, image_filename)
            input_image.save(image_path)
            print(f"Image saved at: {image_path}")
        except Exception as e:
            print(f"Error saving image: {e}")
    
    # static_suffix = ",origami, 3D structure, modular, ensure intricate paper folds and patterns, ultra sharp, cinematic, 100mm lens, 8k resolution"
    static_suffix = ",Ensure intricate folds and patterns, using a single sheet of paper in a complementary color, ultra sharp, cinematic, 100mm lens, 8k resolution"
    prompt = f"{prompt}, {static_suffix}"

    output_image = pipeline.generate(
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
    output_image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    return send_file(img_byte_arr, mimetype='image/png')

@app.route("/api/images", methods=['GET'])
def list_images():
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
def serve_origami_image(filename):
    return send_from_directory(ORIGAMI_IMAGES_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True, port=8080)

