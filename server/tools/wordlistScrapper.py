#!/usr/bin/env python3

import codecs
import sys
import re
import json
import os


os.getcwd()
OUTPUT_FOLDER = os.path.join(__file__)

if __name__ == '__main__':
  if len(sys.argv) != 3:
    print('%s file-to-convert.txt output-file.json' % (sys.argv[0]))
    exit(1)

  filename = sys.argv[1]
  output = sys.argv[2]
  with codecs.open(filename, 'r', encoding='utf-8') as file:
    content = [ line.split(' ')[0] for line in file ]
    json_content = json.dumps(content, ensure_ascii=False)
    codecs.open(output, 'w', encoding='utf-8').write(json_content)
    print('\033[92mDONE ✔')
