# import model_loader
# import pipeline
# from PIL import Image
# from pathlib import Path
# from transformers import CLIPTokenizer
# import torch

# DEVICE = "cpu"

# ALLOW_CUDA = False
# ALLOW_MPS = False

# if torch.cuda.is_available() and ALLOW_CUDA:
#     DEVICE = "cuda"
# elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
#     DEVICE = "mps"
# print(f"Using device: {DEVICE}")

# tokenizer = CLIPTokenizer("../data/vocab.json", merges_file="../data/merges.txt")
# model_file = "../data/v1-5-pruned-emaonly.ckpt"
# models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

# ## TEXT TO IMAGE

# # prompt = "A dog with sunglasses, wearing comfy hat, looking at camera, highly detailed, ultra sharp, cinematic, 100mm lens, 8k resolution."
# prompt = "A dog with sunglasses, wearing comfy hat, looking at camera, highly detailed, ultra sharp, cinematic, 100mm lens, 8k resolution."
# uncond_prompt = ""  # Also known as negative prompt
# do_cfg = True
# cfg_scale = 8  # min: 1, max: 14

# ## IMAGE TO IMAGE

# input_image = None
# # Comment to disable image to image
# image_path = "../images/dog.jpg"
# input_image = Image.open(image_path)
# # Higher values means more noise will be added to the input image, so the result will further from the input image.
# # Lower values means less noise is added to the input image, so output will be closer to the input image.
# strength = 0.6

# ## SAMPLER

# sampler = "ddpm"
# num_inference_steps = 50
# seed = 42

# output_image = pipeline.generate(
#     prompt=prompt,
#     uncond_prompt=uncond_prompt,
#     input_image=input_image,
#     strength=strength,
#     do_cfg=do_cfg,
#     cfg_scale=cfg_scale,
#     sampler_name=sampler,
#     n_inference_steps=num_inference_steps,
#     seed=seed,
#     models=models,
#     device=DEVICE,
#     idle_device="cpu",
#     tokenizer=tokenizer,
# )

# # Combine the input image and the output image into a single image.
# Image.fromarray(output_image)



import model_loader
import pipeline
from PIL import Image
from pathlib import Path
from transformers import CLIPTokenizer
import torch

DEVICE = "cpu"

ALLOW_CUDA = False
ALLOW_MPS = False

if torch.cuda.is_available() and ALLOW_CUDA:
    DEVICE = "cuda"
elif (torch.has_mps or torch.backends.mps.is_available()) and ALLOW_MPS:
    DEVICE = "mps"
print(f"Using device: {DEVICE}")

tokenizer = CLIPTokenizer("../data/vocab.json", merges_file="../data/merges.txt")
model_file = "../data/v1-5-pruned-emaonly.ckpt"
models = model_loader.preload_models_from_standard_weights(model_file, DEVICE)

## TEXT TO IMAGE

# prompt = "A dog with sunglasses, wearing comfy hat, looking at camera, highly detailed, ultra sharp, cinematic, 100mm lens, 8k resolution."
prompt = "Create an origami lampshade based on the provided design, Ensure intricate folds and patterns, using a single sheet of paper in a complementary color, ultra sharp, cinematic, 100mm lens, 8k resolution."
uncond_prompt = ""  # Also known as negative prompt
do_cfg = True
cfg_scale = 8  # min: 1, max: 14

## IMAGE TO IMAGE

input_image = None
# Comment to disable image to image
image_path = "../images/module2.jpeg"
input_image = Image.open(image_path)
# Higher values means more noise will be added to the input image, so the result will further from the input image.
# Lower values means less noise is added to the input image, so output will be closer to the input image.
strength = 0.9

## SAMPLER

sampler = "ddpm"
num_inference_steps = 50
seed = 42

output_image = pipeline.generate(
    prompt=prompt,
    uncond_prompt=uncond_prompt,
    input_image=input_image,
    strength=strength,
    do_cfg=do_cfg,
    cfg_scale=cfg_scale,
    sampler_name=sampler,
    n_inference_steps=num_inference_steps,
    seed=seed,
    models=models,
    device=DEVICE,
    idle_device="cpu",
    tokenizer=tokenizer,
)

# Combine the input image and the output image into a single image.
output_image = Image.fromarray(output_image)

# Save the output image to the output folder
output_path = Path("../output")
output_path.mkdir(parents=True, exist_ok=True)
output_image.save(output_path / "output_image15.png")