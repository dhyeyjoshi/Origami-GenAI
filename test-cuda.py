import torch

def test_cuda():
    # Check if CUDA is available
    if torch.cuda.is_available():
        print("CUDA is available. Using GPU.")
        device = torch.device("cuda")
    else:
        print("CUDA is not available. Using CPU.")
        device = torch.device("cpu")

    try:
        # Allocate a large tensor on the GPU
        tensor_size = (1024, 1024, 512)  # Adjust the size as needed
        print(f"Allocating tensor of size: {tensor_size} on {device}")
        tensor = torch.randn(tensor_size, device=device)
        print("Tensor allocated successfully.")
        
        # Perform a simple operation
        result = tensor * 2
        print("Operation completed successfully.")
    except RuntimeError as e:
        print(f"RuntimeError: {e}")
    except Exception as e:
        print(f"Exception: {e}")

test_cuda()
