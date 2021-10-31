

def split(a):
    n = len(a)
    if n % 2 == 1: a+= "_"
    return [a[i:i+2] for i in range(0, n, 2)]

a = 'abcd'
print(split(a))

