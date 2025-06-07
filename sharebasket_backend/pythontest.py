import numpy as np 

def flipping(x, n):
    sol = np.zeros_like(x)
    for i in range(n):
        sol[:, i] = x[:, n-i-1]
    mask = (sol == 1)
    sol[mask] = 0
    sol[np.logical_not(mask)] = 1
