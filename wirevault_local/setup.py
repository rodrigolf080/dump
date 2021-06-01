#!/usr/bin/python
from getpass import getpass
from subprocess import Popen, DEVNULL
from os.path import exists


def setupVault():
  passwd = getpass("[+] Set Master Password: ")

  cmd = ['touch', 'passwords.txt']
  Popen(cmd, stdout=DEVNULL, stderr=DEVNULL )


  cmd = ['7z', 'a', 'vault.7z', 'passwords.txt','-p%s' % passwd]
  Popen(cmd, stdout=DEVNULL, stderr=DEVNULL ).wait()

  cmd = ['rm', '-f', 'passwords.txt']
  Popen(cmd, stdout=DEVNULL, stderr=DEVNULL )


if exists('vault.7z'):
  exit(0)
else:
  setupVault()

