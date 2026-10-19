PAIRS = [
    # the ground goes on far below the frame (the kitchen floor must never show)
    ('<rect x="-3000" y="1440" width="14000" height="1600" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>', '<rect x="-3000" y="1440" width="14000" height="3200" fill="#8BE08B" stroke="${OL}" stroke-width="8"/>'),
    # the start gantry: a board with START and three lights, high above the King's head
    (""" <rect x="-14" y="1050" width="28" height="700" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-300" y="1000" width="600" height="190" rx="26" fill="#FF5F5F" ${sw(9)}/><text x="0" y="1140" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="130" fill="#fff" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">START</text>
 <rect x="150" y="1190" width="62" height="190" rx="22" fill="#2b2f45" ${sw(7)}/><circle id="ltA" cx="181" cy="1240" r="19" fill="#5a2a2a"/><circle id="ltB" cx="181" cy="1285" r="19" fill="#5a2a2a"/><circle id="ltC" cx="181" cy="1330" r="19" fill="#2a4a2f"/>""",
     """ <rect x="-14" y="1030" width="28" height="710" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-235" y="800" width="470" height="236" rx="30" fill="#FF5F5F" ${sw(9)}/><text x="0" y="888" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="86" fill="#fff" stroke="${OL}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">START</text>
 <rect x="-190" y="912" width="380" height="96" rx="40" fill="#2b2f45" ${sw(7)}/><circle id="ltA" cx="-110" cy="960" r="30" fill="#5a2a2a"/><circle id="ltB" cx="0" cy="960" r="30" fill="#5a2a2a"/><circle id="ltC" cx="110" cy="960" r="30" fill="#2a4a2f"/>"""),
]
