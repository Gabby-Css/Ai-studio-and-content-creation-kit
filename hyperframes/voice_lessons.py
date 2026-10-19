"""python voice_lessons.py [first last] -> every voice line that Whisper did NOT fully recognise when it was generated (words the TTS garbles).
Recursive learning: the list is the 'avoid' list for the next scripts (see CURSOR_HANDOFF/03 playbook)."""
import re, os, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
a, b = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (21, 35)


def read(p):
    raw = open(p, 'rb').read()
    if raw[:2] in (b'\xff\xfe', b'\xfe\xff') or b'\x00' in raw[:200]: return raw.decode('utf-16', errors='ignore')
    return raw.decode('utf-8', errors='ignore')


bad, total = [], 0
for n in range(a, b + 1):
    p = os.path.join(ROOT, f'toon{n}', 'tts.out')
    if not os.path.exists(p): continue
    for m in re.finditer(r'asr (\d+) (.*?) \|\| matched (\d+) / (\d+)', read(p)):
        total += 1
        if m.group(3) != m.group(4): bad.append((n, int(m.group(1)), m.group(2), m.group(3) + '/' + m.group(4)))
for x in bad: print(x)
print(len(bad), 'imperfect lines of', total)
