#!/bin/python3
from subprocess import Popen, DEVNULL
from time import sleep
from getpass import getpass

def __main__():

  cmd = ['python3','setup.py']
  Popen(cmd).wait()

  print("\n***** Password Manager *****")
  print("-----")
  print("[*] Lookup available logins....1)")
  print("[*] Add new login..............2)")
  print("[*] Quit.......................0)")
  print("-----")
  c = int(input("[+] Enter choice: "))

  if c == 0:
    print("[*] Gracefully quitting...")
    exit(0)
  elif c == 1:
    lookupLogins()
  elif c == 2:
    addLogin()
  else:
    print("[x] Incorrect choice, gracefully quitting...")


def decrypt(pw):
  cmd = ['7z', 'x', 'vault.7z', '-p%s' % pw]
  state = Popen(cmd, stdout=DEVNULL,
    stderr=DEVNULL ).wait()

  if state != 0:
    print("[x] Incorrect password, gracefully quitting...")
    exit(0)

def getPasswords():
  file = open('passwords.txt', 'r')
  lines = file.readlines()
  file.close()
  return lines

def encrypt(pw):
  cmd = ['rm', '-rf', 'vault.7z']
  Popen(cmd, stdout=DEVNULL, stderr=DEVNULL)
  cmd = ['7z', 'a', 'vault.7z', 'passwords.txt', '-p%s' % pw]
  Popen(cmd, stdout=DEVNULL,
    stderr=DEVNULL).wait()
  cmd = ['rm', '-f', 'passwords.txt']
  Popen(cmd, stdout=DEVNULL, stderr=DEVNULL)

def printPasswords(lines):
  print("\n***** PASSWORD START *****\n")
  for line in lines:
    print(line.strip())
    print("")
  print("\n***** PASSWORD END *****\n")
  sleep(10)
  cmd = ['clear']
  Popen(cmd, shell=True)
  exit(0)

def addPasswords():
  file = open('passwords.txt', 'a')
  user = input("[+] Enter username: ")
  passwd = input("[+] Enter password: ")
  site = input("[+] Enter login site: ")
  file.write("%s\t%s\t%s\n" % (user, passwd, site))
  file.close()
  print("[*] Successfully added new login")

def lookupLogins():
  pw = getpass("[+] Enter Master Password: ")
  decrypt(pw)
  lines = getPasswords()
  encrypt(pw)
  printPasswords(lines)

def addLogin():
  pw = getpass("[+] Enter Master Password: ")
  decrypt(pw)
  addPasswords()
  encrypt(pw)

__main__()
