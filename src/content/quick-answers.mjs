
export const quickAnswers={
  leak:{
    label:'Leak',icon:'droplet',service:'leak-repairs',guide:'water-through-ceiling',
    symptoms:{
      'dripping-pipe':{label:'Dripping pipe or joint',causes:['Loose or failed joint','Worn seal or valve','Damaged accessible pipework'],checks:'We trace the wet point back to the source, dry the area where possible and check the nearby fittings before replacing anything.',minutes:[60,90],wa:'I have a dripping pipe or joint'},
      'ceiling':{label:'Water through the ceiling',causes:['Leak from pipework above','Overflow or waste leak','Fault at a fitting or appliance connection'],checks:'We first help isolate the water safely, then trace the source above the stain rather than assuming the visible drip is directly below the fault.',minutes:[60,90],wa:'I have water coming through the ceiling'},
      'under-sink':{label:'Leak under a sink',causes:['Waste connection','Tap connector or valve','Trap or seal'],checks:'We run and isolate each likely source, then check the supply and waste connections separately.',minutes:[45,90],wa:'I have a leak under a sink'},
      'appliance':{label:'Leak behind an appliance',causes:['Supply hose or valve','Waste hose connection','Nearby pipe joint'],checks:'We isolate the appliance connection and confirm whether the leak is on the supply, waste or nearby pipework.',minutes:[60,90],wa:'I have a leak behind an appliance'}
    },
    homeNotes:{
      house:'In a house, the visible leak can be some distance from the original fault, especially where water follows joists or pipe runs.',
      converted:'In a converted flat, shared or altered pipe routes can make tracing the source more important than the position of the stain.',
      purpose:'In a purpose-built flat, access panels and service routes often determine how quickly the source can be confirmed.',
      newer:'In a newer apartment, concealed service voids can limit what is visible without using the intended access points.'
    }
  },
  toilet:{
    label:'Toilet',icon:'toilet',service:'toilet-repairs',guide:'toilet-keeps-running',
    symptoms:{
      'keeps-running':{label:'Keeps running',causes:['Worn flush valve seal','Faulty fill valve','Water level set too high'],checks:'We watch the fill and flush cycle to see which valve is letting water through, then check whether a service part is available for the cistern.',minutes:[45,60],wa:'my toilet keeps running'},
      'wont-flush':{label:"Won't flush",causes:['Button or cable fault','Flush valve not lifting','Internal mechanism jammed'],checks:'We check the button, cable and flush valve movement before deciding whether a small part or complete mechanism is needed.',minutes:[45,90],wa:"my toilet won't flush"},
      'wont-fill':{label:"Won't fill",causes:['Fill valve stuck','Isolation valve partly closed','Inlet filter or float fault'],checks:'We check the isolation valve and incoming supply first, then the fill valve and float movement.',minutes:[45,90],wa:"my toilet won't fill"},
      'leaking':{label:'Leaking',causes:['Cistern seal','Pan connector','Inlet or isolation connection'],checks:'We dry the area and test the toilet through several flushes to identify whether the leak is from the inlet, cistern, pan connector or another joint.',minutes:[60,90],wa:'my toilet is leaking'}
    }
  },
  tap:{
    label:'Tap',icon:'tap',service:'tap-repairs',
    symptoms:{
      'dripping':{label:'Dripping',causes:['Worn cartridge or washer','Damaged valve seat','Limescale around the mechanism'],checks:'We identify the tap type, isolate it and check whether the cartridge or internal part can be serviced or replaced.',minutes:[45,90],wa:'I have a dripping tap'},
      'base':{label:'Leaking at the base',causes:['Loose connection','Failed O-ring or seal','Water tracking from above'],checks:'We dry and test the tap so we can separate a body leak from a supply or waste leak below.',minutes:[45,90],wa:'my tap is leaking at the base'},
      'stiff':{label:'Stiff or noisy',causes:['Worn cartridge','Limescale','Loose internal parts'],checks:'We check the movement and cartridge before recommending replacement of the whole tap.',minutes:[45,90],wa:'my tap is stiff or noisy'},
      'replace':{label:'Want a new tap fitted',causes:['Old tap ready for replacement','Upgrade already purchased'],checks:'We check the existing holes, connections and pressure suitability before fitting the replacement.',minutes:[60,90],wa:'I want a new tap fitted'}
    }
  },
  shower:{
    label:'Shower',icon:'shower',service:'shower-repairs',guide:'shower-pressure-dropped',
    symptoms:{
      'surges':{label:'Hot and cold surges',causes:['Thermostatic cartridge','Unbalanced supplies','Restricted filters'],checks:'We check the hot and cold supplies and the shower valve before replacing a cartridge.',minutes:[60,120],wa:'my shower is running hot and cold'},
      'weak':{label:'Weak flow',causes:['Scaled shower head or hose','Restricted valve or filter','Supply or pump problem'],checks:'We separate a shower restriction from a wider supply problem and check any pump serving it.',minutes:[60,120],wa:'my shower has weak flow'},
      'dripping':{label:'Dripping after use',causes:['Worn cartridge or seal','Valve not shutting fully'],checks:'We confirm whether the drip is residual water or a valve that is continuing to pass water.',minutes:[60,120],wa:'my shower keeps dripping'},
      'dead':{label:'Not working at all',causes:['Valve fault','Supply isolated or restricted','Pump problem where fitted'],checks:'We confirm that hot and cold supplies reach the shower, then check the valve or pump as appropriate.',minutes:[60,120],wa:"my shower isn't working"}
    },
    homeNotes:{
      house:'In houses with stored hot water, shower performance can depend on both the available pressure and any pump serving the outlet.',
      converted:'In converted flats, hot and cold supplies may have been altered at different times, so we check how each side is fed before blaming the shower valve.',
      purpose:'In purpose-built flats, the issue may be local to the shower or part of the flat’s wider supply, so we compare other outlets first.',
      newer:'In newer apartments, concealed valves and service access can affect how the shower can be tested and serviced.'
    }
  },
  'low-pressure':{
    label:'Low pressure',icon:'pressure',service:'low-water-pressure',guide:'shower-pressure-dropped',
    symptoms:{
      'whole-house':{label:'Whole house',causes:['Incoming supply restriction','Stopcock not fully open','Internal pipework restriction'],checks:'We compare flow at different outlets and check the internal stopcock before deciding whether the issue is inside the property or on the incoming supply.',minutes:[60,60],wa:'I have low water pressure throughout the property'},
      'upstairs':{label:'Upstairs only',causes:['Long or restricted pipe run','Stored-water arrangement','Local valve restriction'],checks:'We compare downstairs and upstairs outlets and identify whether the weak side is hot, cold or both.',minutes:[60,60],wa:'I have low water pressure upstairs'},
      'hot-only':{label:'Hot only',causes:['Stored hot-water restriction','Valve partly closed','Pipework or outlet restriction'],checks:'We compare hot and cold at the same outlets, then trace the hot supply back toward the cylinder or storage arrangement.',minutes:[60,60],wa:'my hot water pressure is low'},
      'sudden':{label:'Sudden drop',causes:['Valve moved or failed','New restriction or leak','Supply change'],checks:'We establish what changed and compare several outlets before opening up or replacing anything.',minutes:[60,60],wa:'my water pressure has suddenly dropped'}
    },
    homeNotes:{
      house:'In a house, upstairs outlets are usually the best comparison point when working out whether the issue is local or affects the whole system.',
      converted:'In converted houses, upstairs flats can be furthest from the incoming supply and the original pipework may have been split between properties.',
      purpose:'In purpose-built flats, comparing neighbouring outlets inside the flat helps show whether the restriction is at one fitting or affects the flat more widely.',
      newer:'In newer apartments, pressure problems may relate to the building supply as well as fittings inside the flat, so the first step is to compare multiple outlets.'
    }
  },
  'shower-pump':{
    label:'Shower pump',icon:'pump',service:'shower-pumps',guide:'shower-pump-not-working',
    symptoms:{
      'wont-start':{label:"Won't start",causes:['Flow switch not triggering','Supply or isolation issue','Pump fault'],checks:'We check that water can reach the pump, that the shower is calling for flow and that the pump has the conditions it needs to start.',minutes:[90,150],wa:"my shower pump won't start"},
      'noisy':{label:'Very noisy',causes:['Air in the supply','Worn pump','Poor mounting or pipe strain'],checks:'We listen for the type of noise, check the water feed and pipework, and confirm whether the pump itself is wearing out.',minutes:[90,150],wa:'my shower pump is very noisy'},
      'weak':{label:'Runs but weak',causes:['Restricted supply','Air or poor feed','Pump no longer delivering properly'],checks:'We compare flow before and after the pump and check the feed arrangement before recommending replacement.',minutes:[90,150],wa:'my shower pump runs but the flow is weak'},
      'cycles':{label:'Starts and stops',causes:['Flow trigger issue','Air entering the supply','Intermittent restriction'],checks:'We reproduce the fault and check whether flow is dropping below the pump’s trigger point.',minutes:[90,150],wa:'my shower pump keeps starting and stopping'}
    }
  },
  'hot-water':{
    label:'Hot water',icon:'cylinder',service:'hot-water-cylinders',guide:'no-hot-water-cylinder',
    symptoms:{
      'none':{label:'No hot water',causes:['Immersion or control fault','Cylinder-side component','Supply issue'],checks:'We establish what type of cylinder and controls you have, then check the accessible electrical or plumbing-side components within our scope.',minutes:[60,120],wa:'I have no hot water'},
      'lukewarm':{label:'Lukewarm only',causes:['Control or thermostat issue','Heating element issue','Mixing or supply problem'],checks:'We compare the cylinder temperature with what reaches the taps and check the controls and accessible components.',minutes:[60,120],wa:'my hot water is only lukewarm'},
      'cupboard-leak':{label:'Leak in airing cupboard',causes:['Valve or joint leak','Cylinder connection','Overflow or nearby pipework'],checks:'We trace the leak to the exact fitting or connection before deciding whether a component or larger item needs attention.',minutes:[60,120],wa:'I have a leak in the airing cupboard'}
    },
    homeNotes:{
      house:'In houses with stored hot water, the cylinder and its controls may serve several outlets, so we compare the problem across the property.',
      converted:'In converted properties, access and altered pipe routes can matter as much as the cylinder itself when tracing a fault.',
      purpose:'In purpose-built flats, the hot-water arrangement varies by building, so we identify the system before recommending a repair.',
      newer:'In newer apartments, the cylinder may sit in a compact service cupboard with limited working space, so access is checked first.'
    }
  },
  'blocked-sink':{
    label:'Blocked sink',icon:'sink',service:'blocked-sinks-wastes',
    symptoms:{
      'kitchen':{label:'Kitchen sink',causes:['Trap blockage','Grease or debris in accessible waste','Poor fall or local restriction'],checks:'We start at the trap and accessible waste pipework and confirm whether the restriction is within the local plumbing we cover.',minutes:[45,60],wa:'my kitchen sink is blocked'},
      'basin':{label:'Basin',causes:['Hair or soap in waste','Trap restriction','Pop-up waste fault'],checks:'We inspect and clear the basin waste and trap, and replace a failed waste fitting if needed.',minutes:[45,60],wa:'my basin is blocked'},
      'bath':{label:'Bath',causes:['Hair and soap build-up','Waste or trap restriction'],checks:'We check the accessible bath waste and trap and confirm whether the restriction is local.',minutes:[45,60],wa:'my bath is draining slowly'},
      'smell':{label:'Smells or gurgling',causes:['Partial restriction','Trap issue','Waste connection problem'],checks:'We check the trap seal and accessible waste route for a partial blockage or faulty connection.',minutes:[45,60],wa:'my sink smells or gurgles'}
    }
  },
  stopcock:{
    label:'Stopcock',icon:'valve',service:'stopcock-replacement',
    symptoms:{
      'stiff':{label:"Won't turn",causes:['Seized internal parts','Corrosion','Long period without use'],checks:'We test it carefully without forcing it and confirm whether it can be freed or needs replacing.',minutes:[60,120],wa:"my stopcock won't turn"},
      'wont-stop':{label:"Won't stop the water",causes:['Valve not closing fully','Worn internal parts','Wrong valve identified'],checks:'We confirm the valve controls the property and test whether it shuts the supply completely.',minutes:[60,120],wa:"my stopcock won't stop the water"},
      'dripping':{label:'Dripping',causes:['Gland or body leak','Worn internal seal','Joint leak nearby'],checks:'We dry and inspect the valve while operating it to identify where the water is escaping.',minutes:[60,120],wa:'my stopcock is dripping'},
      'find':{label:"Can't find it",causes:['Hidden or boxed-in location','Altered internal pipework'],checks:'We trace the incoming cold supply from accessible points and identify the internal shut-off where possible.',minutes:[60,120],wa:"I can't find my stopcock"}
    }
  },
  other:{
    label:'Something else',icon:'list',service:'small-plumbing-jobs',symptoms:{}
  }
};