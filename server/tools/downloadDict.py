
import subprocess
import os
import re
import json

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
DOWNLOAD_SCRIPT = os.path.join(BASE_DIR, 'downloadWikitionary.sh')

def parse(content):
  dictionary = {}
  for line in content.split('\n'):
    if re.match(r'^#', line): continue
    if not re.match(r'[a-zA-Z]', line): continue

    word, translation = map(lambda x: re.sub(r'^ +| +$', '', x), line.split('::'))
    if not re.match(r'.*[a-zA-Z].*', translation): continue

    word = re.split(r' +', word)[0].lower()
    translation = re.split(r' +', translation)[0].lower()

    if word in dictionary:
      cached = dictionary[word]
      if re.match(r'\(|\)|,', cached):
        # Replace if it's better than previous.
        dictionary[word] = translation
    else:
      dictionary[word] = translation

  print(json.dumps(dictionary, sort_keys=True, indent=2, ensure_ascii=False))


def download(lfrom='en', lto='fr'):
  p = subprocess.Popen(['bash', DOWNLOAD_SCRIPT, lfrom, lto], stdout=subprocess.PIPE)
  content, _ = p.communicate()
  return content.decode('utf-8')

if __name__ == '__main__':
  wiki = download()
  parse(wiki)
