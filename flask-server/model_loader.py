# from clip import CLIP
# from encoder import VAE_Encoder
# from decoder import VAE_Decoder
# from diffusion import Diffusion

# import model_converter

# def preload_models_from_standard_weights(ckpt_path, device):
#     state_dict = model_converter.load_from_standard_weights(ckpt_path, device)

#     encoder = VAE_Encoder().to(device)
#     encoder.load_state_dict(state_dict['encoder'], strict=True)

#     decoder = VAE_Decoder().to(device)
#     decoder.load_state_dict(state_dict['decoder'], strict=True)

#     diffusion = Diffusion().to(device)
#     diffusion.load_state_dict(state_dict['diffusion'], strict=True)

#     clip = CLIP().to(device)
#     clip.load_state_dict(state_dict['clip'], strict=True)

#     return {
#         'clip': clip,
#         'encoder': encoder,
#         'decoder': decoder,
#         'diffusion': diffusion,
#     }

import torch
from clip import CLIP
from encoder import VAE_Encoder
from decoder import VAE_Decoder
from diffusion import Diffusion
import model_converter

# Cached models to avoid reloading for every request
cached_models = {}

def preload_models_from_standard_weights(ckpt_path, device):
    if device not in cached_models:
        state_dict = model_converter.load_from_standard_weights(ckpt_path, device)

        encoder = VAE_Encoder().to(device)
        encoder.load_state_dict(state_dict['encoder'], strict=True)

        decoder = VAE_Decoder().to(device)
        decoder.load_state_dict(state_dict['decoder'], strict=True)

        diffusion = Diffusion().to(device)
        diffusion.load_state_dict(state_dict['diffusion'], strict=True)

        clip = CLIP().to(device)
        clip.load_state_dict(state_dict['clip'], strict=True)

        cached_models[device] = {
            'clip': clip,
            'encoder': encoder,
            'decoder': decoder,
            'diffusion': diffusion,
        }

    return cached_models[device]
