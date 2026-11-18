// Editorial records are deliberately dated. Never infer a live observation from a calendar date.
export const site = {
  name: 'Osaka Garden Chicago',
  origin: 'https://osakagardenchicago.org',
  checked: '2026-11-17',
  checkedLabel: 'November 17, 2026',
  address: '5900 S. Cornell Dr., Chicago, IL 60637',
  maps: 'https://www.google.com/maps/dir/?api=1&destination=Osaka+Garden+5900+S+Cornell+Dr+Chicago',
  sources: {
    garden: 'https://www.chicagoparkdistrict.com/parks-facilities/osaka-garden',
    blossoms: 'https://www.chicagoparkdistrict.com/cherry-blossoms',
    blossomMap: 'https://chiparks.maps.arcgis.com/apps/instant/imageryviewer/index.html?appid=c661f6243e4d4e5c81d8d9e57f82dc24',
    history: 'https://www.gardenofthephoenix.org/',
    designs: 'https://www.gardenofthephoenix.org/design-history',
    museum: 'https://www.chicagohistory.org/sakura-and-shinto-in-chicago/',
    transit: 'https://www.transitchicago.com/planatrip/'
  }
};

export const bloom = {
  year: 2027,
  status: 'Awaiting the first report',
  shortStatus: '2027 season ahead',
  observationDate: null,
  peakDate: null,
  description: 'No dated 2027 bloom report was available when this guide was checked. A peak bloom date has not been confirmed.',
  previousReport: { date: '2026-04-14', label: 'April 14, 2026', description: 'The Park District reported most trees past full bloom.' }
};

export const timeline = [
  ['1893', 'A friendship takes root', 'Japan’s Phoenix Pavilion is dedicated on Wooded Island for the World’s Columbian Exposition. The pavilion remains as a gift to Chicago after the fair.'],
  ['1935', 'A garden for wandering', 'A restored pavilion and new Japanese stroll garden open, bringing water, stone, and winding paths into a small landscape.'],
  ['1946', 'Loss, and a long quiet', 'Arson destroys the Phoenix Pavilion. The garden declines in the years that follow.'],
  ['1981', 'The garden returns', 'Landscape architect Kaneji Domoto’s restoration opens, renewing the island’s Japanese garden.'],
  ['1993', 'The Osaka connection', 'The garden takes the Osaka name, marking twenty years of Chicago’s sister-city relationship with Osaka.'],
  ['2016', 'A new expression of peace', 'Yoko Ono’s SKYLANDING, a sculpture of twelve rising petals, is dedicated beside the garden.']
];

export const faqs = [
  ['Is admission free?', 'Yes. The Park District lists free admission. Donations are optional; there is no required admission payment.'],
  ['Are Osaka Garden and Garden of the Phoenix the same place?', 'The names are closely connected. Osaka Garden is the Japanese garden on Wooded Island; Garden of the Phoenix also refers to the historic site and the foundation that supports it.'],
  ['Can I bring a stroller, bicycle, or pet?', 'The garden’s published rules exclude strollers, bicycles, and dogs. Pets are also prohibited on Wooded Island. Contact garden staff about specific access needs or service-animal arrangements.'],
  ['Can I take photos or have a picnic inside?', 'The current garden rules prohibit photography, picnics, and events inside the garden. Follow posted signs and staff guidance. The wider Jackson Park blossom walk is a separate experience.'],
  ['Do I need a reservation?', 'The garden limits entry to 50 visitors at a time. The Park District asks groups larger than five to request a group visit through its official garden page.'],
  ['How long should I allow?', 'Our suggestion: allow 30–45 minutes for a slow garden visit, or 60–90 minutes when adding the lagoon and blossom walk. These are planning estimates, not official tour durations.']
];
