export default {
  projects: [],
  tasks: [],
  tasksRole: [
    {
      on: false,
      name: "name",
      value: [""],
    },
    {
      on: false,
      name: "priority",
      value: ["low", "medium", "high"],
      selected: "low",
    },
    {
      on: false,
      name: "estimated lead time",
      value: ["1", "5", "10", "30"],
      selected: {
        1: 0,
        5: 0,
        10: 0,
        30: 0,
        unit: "minute",
      },
      time: 0,
    },
    {
      on: false,
      name: "deadline",
      value: [],
      selected: "",
    },
    {
      on: false,
      name: "take a break",
      value: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
      selected: {
        "5 minutes": 0,
        "15 minutes": 0,
        "30 minutes": 0,
        "1 hour": 0,
      },
      time: 0,
    },
    {
      on: false,
      name: "project",
      value: [],
      selected: "",
    },
    {
      active: true,
      name: "reminder",
    },
    {
      active: false,
      name: "lock",
    },
  ],
  projectsRole: [
    {
      on: false,
      name: "name",
      value: [""],
    },
    {
      on: false,
      name: "priority",
      value: ["low", "medium", "high"],
      selected: "low",
    },
    {
      on: false,
      name: "estimated lead time",
      value: ["1", "5", "10", "30"],
      selected: {
        1: 0,
        5: 0,
        10: 0,
        30: 0,
        unit: "minute",
      },
      time: 0,
    },
    {
      on: false,
      name: "deadline",
      selected: "",
    },
    {
      active: true,
      name: "reminder",
    },
    {
      active: false,
      name: "lock",
    },
  ],
  messages: [],
  quotes: [
    {
      quote:
        "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
      author: "Pelé",
    },
    {
      quote: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
      author: "General Colin Powell",
    },
    {
      quote:
        "People always say that I didn't give up my seat because I was tired, but that isn't true. I was not tired physically… No, the only tired I was, was tired of giving in.",
      author: "Rosa Parks",
    },
    {
      quote: "However difficult life may seem, there is always something you can do and succeed at.",
      author: "Stephen Hawking",
    },
    {
      quote: "Striving for success without hard work is like trying to harvest where you haven't planted.",
      author: "David Bly",
    },
    {
      quote: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      quote:
        "Success isn't overnight. It's when every day you get a little better than the day before. It all adds up.",
      author: "Dwayne Johnson",
    },
    {
      quote: "The secret of success is to do the common things uncommonly well.",
      author: "John D. Rockefeller",
    },
    {
      quote: "Success doesn't come to you, you go to it.",
      author: "Marva Collins",
    },
    {
      quote:
        "Recipe for success: Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.",
      author: "William A. Ward",
    },
    {
      quote: "Success is the progressive realization of a worthy goal.",
      author: "Earl Nightingale",
    },
    {
      quote: "Power's not given to you. You have to take it.",
      author: "Beyoncé",
    },
    {
      quote:
        "You may encounter many defeats but you must not be defeated. In fact, it may be necessary to encounter the defeats, so you can know who you are, what you can rise from, how you can still come out of it.",
      author: "Maya Angelou",
    },
    {
      quote: "Failure is the opportunity to begin again more intelligently.",
      author: "Henry Ford",
    },
    {
      quote: "Failure doesn't mean the game is over, it means try again with experience.",
      author: "Len Schlesinger",
    },
    {
      quote: "And why do we fall, Bruce? So we can learn to pick ourselves up.",
      author: "Thomas Wayne",
    },
    {
      quote: "If you fell down yesterday, stand up today.",
      author: "H.G. Wells",
    },
    {
      quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
      author: "Thomas Edison",
    },
    {
      quote: "One of the most common causes of failure is quitting when one is overtaken by temporary defeat.",
      author: "Napoleon Hill",
    },
    {
      quote: "Success consists of going from failure to failure without loss of enthusiasm.",
      author: "Winston Churchill",
    },
    {
      quote: "I've failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan",
    },
    {
      quote:
        "The day you take complete responsibility for yourself, the day you stop making any excuses, that's the day you start to the top.",
      author: "O.J. Simpson",
    },
    {
      quote: `Nothing is impossible. The word itself says "I'm Possible."`,
      author: "Audrey Hepburn",
    },
    {
      quote: "You cannot swim for new horizons until you have courage to lose sight of the shore.",
      author: "William Faulkner",
    },
    {
      quote: "Do the best you can until you know better. Then when you know better, do better.",
      author: "Maya Angelou",
    },
    {
      quote:
        "There are two kinds of people in this world: those who want to get things done and those who don't want to make mistakes.",
      author: "John Maxwell",
    },
    {
      quote: "When we are no longer able to change a situation we are challenged to change ourselves.",
      author: "Viktor Frankl",
    },
    {
      quote: "Make sure your own worst enemy doesn't live between your two ears.",
      author: "Laird Hamilton",
    },
    {
      quote: "Don't wish it were easier; wish you were better.",
      author: "Jim Rohn",
    },
    {
      quote: "The only place where success comes before work is in the dictionary.",
      author: "Vidal Sassoon",
    },
    {
      quote: "I'm not telling you it is going to be easy. I'm telling you it's going to be worth it.",
      author: "Art Williams",
    },
    {
      quote: "I find that the harder I work, the more luck I seem to have.",
      author: "Thomas Jefferson",
    },
    {
      quote: "If people only knew how hard I've worked to gain my mastery, it wouldn't seem so wonderful at all.",
      author: "Michelangelo",
    },
    {
      quote: "All happiness depends on courage and work.",
      author: "Honore de Balzac",
    },
    {
      quote: "There are no shortcuts to any place worth going.",
      author: "Beverly Sills",
    },
    {
      quote: "There is no substitute for hard work.",
      author: "Thomas Edison",
    },
    {
      quote: "There are no traffic jams on the extra mile.",
      author: "Zig Ziglar",
    },
  ],
  timer: {
    on: false,
    duration: 0,
    tasks: [],
    value: ["5 minutes", "15 minutes", "30 minutes"],
    selected: {
      "5 minutes": 0,
      "15 minutes": 0,
      "30 minutes": 0,
    },
  },
}
