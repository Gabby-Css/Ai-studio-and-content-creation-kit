PAIRS = [
    ("const KART_HTML=(id,c1,c2)=>`<g id=\"${id}W\" opacity=\"0\"><g id=\"${id}\"><g id=\"${id}S\">", "const KART_HTML=(id,c1,c2,bias=0)=>`<g id=\"${id}W\" opacity=\"0\"><g transform=\"translate(0,${-bias})\"><g id=\"${id}\"><g id=\"${id}S\">"),
    ("</g></g></g>`;\nconst RS_HTML=", "</g></g></g></g>`;\nconst RS_HTML="),
]
