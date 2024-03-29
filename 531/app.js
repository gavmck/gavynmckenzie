function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setupProgram() {
  // Get the query params and put them in an object
  const search = new URLSearchParams(window.location.search);
  const params = Array.from(search.keys()).reduce(
    (acc, val) => ({ ...acc, [val]: search.get(val) }),
    {}
  );

  Array.from(search.keys()).forEach((key) => {
    const input = document.querySelector(`input[name=${key}]`);
    if (input) {
      input.value = search.get(key);
    }
  });

  // Check we have all the data we need
  const requiredParams = ['squat', 'bench', 'deadlift', 'press', 'program'];
  const missingParams = requiredParams.filter(param => !params[param]);

  if (missingParams.length === requiredParams.length) {
    return;
  }

  if (missingParams.length) {
    alert('Missing required params: ' + missingParams.join(', '));
    return;
  }

  const tms = {
    squat: Number(params.squat),
    bench: Number(params.bench),
    deadlift: Number(params.deadlift),
    press: Number(params.press),
  };

  const variants = {
    531: [
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 65, r: 5 }, { w: 75, r: 5 }, { w: 85, r: '5+' }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 3 }, { w: 80, r: 3 }, { w: 90, r: '3+' }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 3 }, { w: 95, r: '1+' }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 65, r: 5 }, { w: 75, r: 5 }, { w: 85, r: '5+' }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 3 }, { w: 80, r: 3 }, { w: 90, r: '3+' }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 3 }, { w: 95, r: '1+' }],
    ],
    '5spro': [
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 65, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 5 }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 5 }, { w: 80, r: 5 }, { w: 90, r: 5 }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 5 }, { w: 95, r: 5 }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 65, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 5 }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 5 }, { w: 80, r: 5 }, { w: 90, r: 5 }],
      [{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 75, r: 5 }, { w: 85, r: 5 }, { w: 95, r: 5 }],
    ],
    80: [1,2,3,4,5,6].map(() => [
      { w: 80, r: 5 },
      { w: 80, r: 5 },
      { w: 80, r: 5 },
      { w: 80, r: 5 },
      { w: 80, r: 5 },
    ]),
    bbb: [1,2,3,4,5,6].map(() => [
      { w: 50, r: 10 },
      { w: 50, r: 10 },
      { w: 50, r: 10 },
      { w: 50, r: 10 },
      { w: 50, r: 10 },
    ]),
    fsl: [
      [1, 2, 3, 4, 5].map(() => ({ w: 65, r: 5 })),
      [1, 2, 3, 4, 5].map(() => ({ w: 70, r: 5 })),
      [1, 2, 3, 4, 5].map(() => ({ w: 75, r: 5 })),
      [1, 2, 3, 4, 5].map(() => ({ w: 65, r: 5 })),
      [1, 2, 3, 4, 5].map(() => ({ w: 70, r: 5 })),
      [1, 2, 3, 4, 5].map(() => ({ w: 75, r: 5 })),
    ],
    '7thweekdeload': [[{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 3 }, { w: 80, r: 1 }, { w: 90, r: 1 }, { w: 100, r: 1 }]],
    '7thweektm': [[{ w: 40, r: 5 }, { w: 50, r: 5 }, { w: 60, r: 5 }, { w: 70, r: 5 }, { w: 80, r: 5 }, { w: 90, r: 5 }, { w: 100, r: '3-5' }]],
  }

  const programs = {
    '1000percentawesome': {
      sections: [
        {
          title: 'Leader',
          length: 6,
          days: [
            [
              { lift: 'squat', variant: 80 },
              { lift: 'bench', variant: '5spro' },
            ],
            [
              { lift: 'deadlift', variant: '5spro' },
              { lift: 'press', variant: 80 },
            ],
            [
              { lift: 'squat', variant: '5spro' },
              { lift: 'bench', variant: 80 },
            ],
          ]
        },
        {
          title: '7th week deload',
          length: 1,
          days: [
            [
              { lift: 'bench', variant: '7thweekdeload' },
            ],
            [
              { lift: 'deadlift', variant: '7thweekdeload' },
              { lift: 'press', variant: '7thweekdeload' },
            ],
            [
              { lift: 'squat', variant: '7thweekdeload' },
            ],
          ]
        },
        {
          title: 'Anchor',
          length: 3,
          days: [
            [
              { lift: 'squat', variant: 'fsl' },
              { lift: 'bench', variant: 531 },
            ],
            [
              { lift: 'deadlift', variant: '531' },
              { lift: 'press', variant: 'fsl' },
            ],
            [
              { lift: 'squat', variant: 531 },
              { lift: 'bench', variant: 'fsl' },
            ],
          ]
        },
        {
          title: '7th week TM test',
          length: 1,
          days: [
            [
              { lift: 'bench', variant: '7thweektm' },
            ],
            [
              { lift: 'deadlift', variant: '7thweektm' },
              { lift: 'press', variant: '7thweektm' },
            ],
            [
              { lift: 'squat', variant: '7thweektm' },
            ],
          ]
        },
      ],
    },
    'boringbutbig': {
      sections: [
        {
          title: 'Leader',
          length: 6,
          days: [
            [
              { lift: 'squat', variant: '5spro' },
              { lift: 'squat', variant: 'bbb' },
            ],
            [
              { lift: 'bench', variant: '5spro' },
              { lift: 'bench', variant: 'bbb' },
            ],
            [
              { lift: 'deadlift', variant: '5spro' },
              { lift: 'deadlift', variant: 'bbb' },
            ],
            [
              { lift: 'press', variant: '5spro' },
              { lift: 'press', variant: 'bbb' },
            ],
          ]
        },
        {
          title: '7th week deload',
          length: 1,
          days: [
            [
              { lift: 'squat', variant: '7thweekdeload' },
            ],
            [
              { lift: 'bench', variant: '7thweekdeload' },
            ],
            [
              { lift: 'deadlift', variant: '7thweekdeload' },
            ],
            [
              { lift: 'press', variant: '7thweekdeload' },
            ],
          ]
        },
        {
          title: 'Anchor',
          length: 3,
          days: [
            [
              { lift: 'squat', variant: '531' },
              { lift: 'squat', variant: 'fsl' },
            ],
            [
              { lift: 'bench', variant: '531' },
              { lift: 'bench', variant: 'fsl' },
            ],
            [
              { lift: 'deadlift', variant: '531' },
              { lift: 'deadlift', variant: 'fsl' },
            ],
            [
              { lift: 'press', variant: '531' },
              { lift: 'press', variant: 'fsl' },
            ],
          ]
        },
        {
          title: '7th week TM test',
          length: 1,
          days: [
            [
              { lift: 'squat', variant: '7thweektm' },
            ],
            [
              { lift: 'bench', variant: '7thweektm' },
            ],
            [
              { lift: 'deadlift', variant: '7thweektm' },
            ],
            [
              { lift: 'press', variant: '7thweektm' },
            ],
          ]
        },
      ],
    },
  }

  const program = programs[params.program];

  if (!program) {
    alert('Unknown program: ' + params.program);
    return;
  }

  let weekCount = -1;

  program.sections.forEach((section, sectionIndex) => {
    const container = document.createElement('div');
    container.classList.add('spacing');
    container.classList.add('spacing--bottom-lg');

    container.innerHTML = `
      <h3>${section.title}</h3>

      ${[...Array(section.length).keys()].map((week) => {
        if (!section.title.includes('7th week')) {
          weekCount++;
        }
        return `
          <details>
            <summary>Week ${week + 1}</summary>

            ${section.days.map((day, i) => {
              return `
                <div class="day">
                  <h4 class="day__title">Day ${i + 1}</h4>

                  <ul class="day__exercises">
                    ${day.map((exercise) => {
                      const lifts = variants[exercise.variant][week];
                      return `
                        <li class="day__exercise">
                          <strong class="day__exercise-name">${ucfirst(exercise.lift)}</strong>
                          ${lifts.map(lift => {
                            const tm = tms[exercise.lift] + (Math.floor(weekCount  / 3) * 2.5);
                            const rawWeight = (tm * lift.w) / 100;
                            // round to nearest 2.5
                            const weight = Math.round(rawWeight / 2.5) * 2.5;
                            return `<span class="day__lift">${weight}x${lift.r}</span>`;
                          }).join(' ')}
                        </li>
                      `;
                    }).join('')}
                  </ul>
                </div>
              `;
            }).join('')}
          </details>
        `;
      }).join('')}
    `;

    document.querySelector('#results').appendChild(container);
    document.querySelector('#results-container').removeAttribute('hidden');
  })
}

setupProgram();
