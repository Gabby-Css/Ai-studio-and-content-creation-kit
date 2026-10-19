p = "sing_song.py"; s = open(p, encoding="utf8").read()
old = 'HARM_KINDS = {"hook", "house", "fin"}'
assert old in s; s = s.replace(old, 'HARM_KINDS = {"hook", "recap", "fin"}')
old = 'C_MAJ = [0, 2, 4, 5, 7, 9, 11]'
new = '''# phonics: the LETTER SOUNDS ("kuh", "a", "tuh") are Kokoro IPA strings, sung like any other word.  Token 'c|k:G4:2' = shown as c, sounds as SND['k'].
SND = {"k": "kʌ", "t": "tʌ", "d": "dʌ", "g": "ɡʌ", "p": "pʌ", "b": "bʌ", "h": "hʌ", "s": "sʌ", "n": "nʌ", "r": "ɹʌ",
       "a": "æ", "o": "ɔ", "u": "ʌ", "i": "ɪ", "e": "ɛ"}
singer.PHON.update({"ig": "ɪɡ", "un": "ʌn"})
def spoken(x):
    """the text Kokoro is asked to say for a word token: a letter-sound key for sound tokens, the plain word otherwise"""
    ph = x.get("ph")
    if ph:
        key = "snd_" + ph; singer.PHON[key] = SND[ph]; return key
    return re.sub(r"[^A-Za-z']", "", x["text"])

C_MAJ = [0, 2, 4, 5, 7, 9, 11]'''
assert old in s; s = s.replace(old, new, 1)
old = '''                word = re.sub(r"[^A-Za-z']", "", x["text"]);
                if not word: continue'''
assert old in s; s = s.replace(old, '''                word = spoken(x)
                if not word: continue''')
old = 'singer.onset_dur(re.sub(r"[^A-Za-z\']", "", y["text"]), cfg["voice"])'
assert old in s; s = s.replace(old, 'singer.onset_dur(spoken(y), cfg["voice"])')
open(p, "w", encoding="utf8").write(s); print("ok")
