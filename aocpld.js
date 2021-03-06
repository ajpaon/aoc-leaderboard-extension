const current_page = window.location.pathname;
const match = /\/(\d+)\/leaderboard\/private\/view\/(\d+)/.exec(current_page);
const year = match[1]
const leaderboard_id = match[2];

const request_url = `https://adventofcode.com/${year}/leaderboard/private/view/${leaderboard_id}.json?via=ajpaon/aoc-leaderboard-extension`;

const createRow = (place, ts, name) => {
  const row = document.createElement('div');
  row.className = 'privboard-row';

  const placeElt = document.createElement('span');
  placeElt.className = 'privboard-position';
  placeElt.innerText = `${place+1})`.padEnd(5);

  row.appendChild(placeElt);

  const nameElt = document.createElement('span');
  nameElt.className = 'privboard-name';
  nameElt.innerText = name.padEnd(30); // to line up with names from above
  row.appendChild(nameElt);

  const timeElt = document.createElement('span');
  timeElt.innerText = `${new Date(ts)}`;
  row.appendChild(timeElt);

  return row;
};

const createHeader = (day, part) => {
  const p = document.createElement('p');
  p.innerText = `Day ${day} -- Part ${part}`;
  p.style = 'font-weight: bold';
  details.appendChild(p);
};

const details = document.createElement('article');
document.querySelector('main').appendChild(details);

fetch(request_url).then(r=>r.json()).then(data=> {
  problem_times = []
  member_ids = Object.keys(data.members);
  for (let i = 1; i <= 25; ++i) {
    const part1 = []
    const part2 = []
    for (const member_id of member_ids) {
      const name = data.members[member_id].name
      const day = data.members[member_id].completion_day_level[i];
      if (!day) continue;
      if (day[1] && day[1].get_star_ts) part1.push([parseInt(day[1].get_star_ts) * 1000, name]);
      if (day[2] && day[2].get_star_ts) part2.push([parseInt(day[2].get_star_ts) * 1000, name]);
    }

    if (part1.length) {
      createHeader(i, 1);
      for (const [place, [ts, name]] of part1.sort().entries()) details.appendChild(createRow(place, ts, name));
    }

    if (part2.length) {
      createHeader(i, 2);
      for (const [place, [ts, name]] of part2.sort().entries()) details.appendChild(createRow(place, ts, name));
    }
  };
});
