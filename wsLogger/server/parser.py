#!/usr/bin/python3
import os

filename = 'logs/127.0.0.1'
with open(filename, "r") as f:
  data = f.read()

print(data)

with open(filename + '.log', "a") as f:
  for line in data:
    if ('\n' in line):
      f.write('\n')
    f.write(str(line))
  f.close()
