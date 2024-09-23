import torch
import time

def force_gpu_utilization(device='cuda', tensor_size=(4096, 4096), iterations=100):
    # Check if CUDA is available
    if torch.cuda.is_available():
        print("CUDA is available. Using GPU.")
        device = torch.device(device)
    else:
        print("CUDA is not available. Using CPU.")
        device = torch.device("cpu")

    # Allocate two large tensors on the GPU
    print(f"Allocating two tensors of size: {tensor_size} on {device}")
    tensor_a = torch.randn(tensor_size, device=device)
    tensor_b = torch.randn(tensor_size, device=device)
    
    print("Starting matrix multiplications to stress the GPU.")
    
    start_time = time.time()
    for i in range(iterations):
        # Perform matrix multiplication (this will engage the GPU heavily)
        result = torch.matmul(tensor_a, tensor_b)
        
        # Synchronize after every iteration to ensure GPU completes the task
        torch.cuda.synchronize() if device.type == 'cuda' else None
        
        if (i + 1) % 10 == 0:
            print(f"Iteration {i + 1}/{iterations} completed.")
    
    end_time = time.time()
    
    total_time = end_time - start_time
    print(f"Completed {iterations} matrix multiplications in {total_time:.2f} seconds.")
    
    # Free GPU memory
    del tensor_a, tensor_b, result
    torch.cuda.empty_cache()

# Run the function
force_gpu_utilization(device='cuda', tensor_size=(10000, 10000), iterations=100)
