import { CommunityContent } from './types';

export const communityData: CommunityContent = {
  articles: [
    {
      title: "The Ultimate Guide to Meal Prep",
      summary: "Learn how to efficiently plan and prepare your meals for a healthier lifestyle.",
      readTime: "8 min",
      category: "Meal Planning",
      author: {
        name: "Nikki Glor",
        image: "/assets/avatars/avatar1.svg",
        role: "Health Coach"
      },
      date: "1 day ago",
      likes: 245,
      comments: 42,
      link: "https://www.healthline.com/nutrition/meal-prepping-guide"
    },
    {
      title: "How Diet Affects Your Mental Health",
      summary: "Discover how nutrition impacts your mood and mental well-being.",
      readTime: "10 min",
      category: "Nutrition",
      author: {
        name: "Dr. Uma Naidoo",
        image: "/assets/avatars/avatar2.svg",
        role: "Psychiatrist"
      },
      date: "3 days ago",
      likes: 180,
      comments: 30,
      link: "https://www.harvard.edu/news/2020/02/05/how-food-affects-your-mental-health/"
    },
    {
      title: "Top 10 Superfoods for Brain Health",
      summary: "Boost your cognitive function with these nutrient-packed foods.",
      readTime: "6 min",
      category: "Superfoods",
      author: {
        name: "Megan Ware",
        image: "/assets/avatars/avatar3.svg",
        role: "Registered Dietitian"
      },
      date: "5 days ago",
      likes: 320,
      comments: 55,
      link: "https://www.medicalnewstoday.com/articles/324329"
    },
    {
      title: "How Hydration Affects Your Mood",
      summary: "Find out why drinking enough water is essential for mental clarity.",
      readTime: "5 min",
      category: "Wellness",
      author: {
        name: "Dr. Michael Breus",
        image: "/assets/avatars/avatar4.svg",
        role: "Sleep Specialist"
      },
      date: "1 week ago",
      likes: 210,
      comments: 25,
      link: "https://www.psychologytoday.com/us/blog/sleep-newzzz/201806/how-hydration-affects-your-mood"
    },
    {
      title: "Understanding the Gut-Brain Connection",
      summary: "Learn how your gut health impacts mental well-being.",
      readTime: "7 min",
      category: "Digestive Health",
      author: {
        name: "Dr. David Perlmutter",
        image: "/assets/avatars/avatar5.svg",
        role: "Neurologist"
      },
      date: "2 weeks ago",
      likes: 150,
      comments: 18,
      link: "https://www.drperlmutter.com/the-gut-brain-connection/"
    },
    {
      title: "The Role of Omega-3 in Managing Anxiety",
      summary: "Explore how fatty acids can help reduce anxiety symptoms.",
      readTime: "9 min",
      category: "Supplements",
      author: {
        name: "Dr. Andrew Weil",
        image: "/assets/avatars/avatar6.svg",
        role: "Integrative Medicine Expert"
      },
      date: "3 weeks ago",
      likes: 190,
      comments: 40,
      link: "https://www.webmd.com/anxiety-panic/guide/omega-3-fatty-acids-anxiety"
    },
    {
      title: "Why Magnesium is Essential for Mental Health",
      summary: "Discover the benefits of magnesium-rich foods on brain function.",
      readTime: "6 min",
      category: "Minerals",
      author: {
        name: "Rachel Carter",
        image: "/assets/avatars/avatar7.svg",
        role: "Dietitian"
      },
      date: "1 month ago",
      likes: 175,
      comments: 22,
      link: "https://www.healthline.com/nutrition/magnesium-and-mental-health"
    },
    {
      title: "Caffeine: Friend or Foe for Your Mental State?",
      summary: "Uncover how caffeine affects stress, focus, and sleep quality.",
      readTime: "8 min",
      category: "Beverages",
      author: {
        name: "Dr. James Greenblatt",
        image: "/assets/avatars/avatar8.svg",
        role: "Psychiatrist"
      },
      date: "1 month ago",
      likes: 230,
      comments: 35,
      link: "https://www.psychologytoday.com/us/blog/mental-health-101/201902/caffeine-and-anxiety"
    },
    {
      title: "The Importance of Balanced Nutrition for Mental Clarity",
      summary: "Explore how a balanced diet can enhance mental clarity.",
      readTime: "7 min",
      category: "Nutrition",
      author: {
        name: "Laura Kim",
        image: "/assets/avatars/avatar9.svg",
        role: "Health Educator"
      },
      date: "2 weeks ago",
      likes: 160,
      comments: 28,
      link: "https://www.verywellmind.com/healthy-eating-for-mental-health-5192132"
    },
    {
      title: "Exploring Plant-Based Diets for Mental Health",
      summary: "Learn about the benefits of plant-based diets on mental health.",
      readTime: "9 min",
      category: "Dietary Choices",
      author: {
        name: "Tom Richards",
        image: "/assets/avatars/avatar10.svg",
        role: "Plant-Based Nutritionist"
      },
      date: "1 month ago",
      likes: 210,
      comments: 33,
      link: "https://www.forksoverknives.com/health-benefits-of-a-plant-based-diet/"
    }
  ],
  testimonies: [
    {
      title: "Healing Through Whole Foods",
      author: "Aarav Patel",
      story: "For years, I struggled with anxiety and fatigue. After switching to a whole foods diet, I noticed a significant improvement in my energy levels and focus. The natural nutrients helped me feel more balanced and grounded.",
      authorImage: "/assets/avatars/avatar1.svg",
      likes: 156,
      comments: 28,
      shares: 12,
      bookmarks: 45,
      timestamp: "2 days ago",
      featured: true
    },
    {
      title: "Beating Depression with Proper Nutrition",
      author: "Lisa Martinez",
      story: "Reducing my caffeine intake and incorporating more complex carbohydrates into my meals have made a huge difference in stabilizing my mood. I feel more in control and less overwhelmed by my emotions.",
      authorImage: "/assets/avatars/avatar2.svg",
      likes: 142,
      comments: 32,
      shares: 15,
      bookmarks: 38,
      timestamp: "4 days ago",
      featured: false
    },
    {
      author: "Jordan Lee",
      title: "Overcoming Stress Eating",
      story: "I used to rely on junk food whenever I felt stressed. However, learning about mindful eating techniques transformed my relationship with food. Now, I choose healthier options that nourish my body and mind.",
      authorImage: "/assets/avatars/avatar3.svg",
      likes: 118,
      comments: 22,
      shares: 10,
      bookmarks: 30,
      timestamp: "1 week ago",
      featured: false
    },
    {
      author: "Michael Johnson",
      title: "Keto Diet and Anxiety Relief",
      story: "Switching to a keto diet was a game-changer for me. It helped me manage my anxiety levels and improve my focus. I’ve never felt more clear-headed and motivated in my life.",
      authorImage: "/assets/avatars/avatar4.svg",
      likes: 98,
      comments: 15,
      shares: 8,
      bookmarks: 25,
      timestamp: "2 weeks ago",
      featured: false
    },
    {
      title: "Plant-Based Eating for Mental Clarity",
      author: "Emily Tran",
      story: "Transitioning to a plant-based diet has greatly improved my mental clarity. I feel lighter and more energized, which has positively impacted my productivity and overall well-being.",
      authorImage: "/assets/avatars/avatar5.svg",
      likes: 110,
      comments: 18,
      shares: 20,
      bookmarks: 35,
      timestamp: "1 month ago",
      featured: false
    },
    {
      title: "Mindful Eating Changed My Life",
      author: "Sofia Kim",
      story: "Practicing mindful eating has helped me develop a healthier relationship with food. I now savor each bite and listen to my body's hunger cues, which has reduced my emotional eating.",
      authorImage: "/assets/avatars/avatar6.svg",
      likes: 135,
      comments: 25,
      shares: 14,
      bookmarks: 40,
      timestamp: "3 weeks ago",
      featured: false
    },
    {
      title: "Finding Balance with Intuitive Eating",
      author: "Derek Brown",
      story: "Embracing intuitive eating allowed me to break free from diet culture. I now eat what I crave without guilt, and it has significantly improved my mental health.",
      authorImage: "/assets/avatars/avatar7.svg",
      likes: 122,
      comments: 30,
      shares: 9,
      bookmarks: 28,
      timestamp: "2 weeks ago",
      featured: false
    },
    {
      title: "How Smoothies Helped My Mood",
      author: "Nina Patel",
      story: "Incorporating smoothies into my daily routine has been a fantastic way to boost my mood. They are packed with nutrients, and I feel great knowing I'm fueling my body with healthy ingredients.",
      authorImage: "/assets/avatars/avatar8.svg",
      likes: 145,
      comments: 27,
      shares: 16,
      bookmarks: 33,
      timestamp: "1 month ago",
      featured: false
    },
    {
      title: "The Impact of Omega-3s on My Anxiety",
      author: "Ryan Smith",
      story: "After adding more omega-3-rich foods to my diet, I noticed a decrease in my anxiety levels. It’s amazing how nutrition can play such a vital role in mental health.",
      authorImage: "/assets/avatars/avatar9.svg",
      likes: 155,
      comments: 29,
      shares: 11,
      bookmarks: 39,
      timestamp: "1 month ago",
      featured: false
    },
    {
      title: "Yoga and Nutrition for Stress Relief",
      author: "Olivia Chen",
      story: "Combining yoga with a balanced diet has been transformative for my stress levels. I feel more centered and capable of handling life's challenges.",
      authorImage: "/assets/avatars/avatar10.svg",
      likes: 160,
      comments: 34,
      shares: 18,
      bookmarks: 42,
      timestamp: "2 weeks ago",
      featured: false
    }
  ],
  
  surveys: [
    {
      title: "Your Diet and Mental Health",
      questions: [
        {
          question: "How often do you consume processed foods?",
          options: [
            "Never",
            "1-2 times per week",
            "3-5 times per week",
            "Daily"
          ]
        },
        {
          question: "Do you notice mood changes after sugary foods?",
          options: [
            "Yes, significant changes",
            "Sometimes",
            "Rarely",
            "Never noticed"
          ]
        }
      ],
      estimatedTime: "3-5 mins",
      participantCount: 234,
      featured: true
    },
    {
      title: "Food Choices and Emotional Well-being",
      questions: [
        {
          question: "Do you experience emotional changes after consuming fast food?",
          options: [
            "Yes, frequently",
            "Sometimes",
            "Rarely",
            "Never"
          ]
        },
        {
          question: "How often do you eat Omega-3 rich foods?",
          options: [
            "Daily",
            "2-3 times per week",
            "Once a week",
            "Rarely or never"
          ]
        }
      ],
      estimatedTime: "2-3 mins",
      participantCount: 156,
      featured: true
    },
    {
      title: "Healthy Eating Habits Quiz",
      questions: [
        {
          question: "What is considered a superfood?",
          options: [
            "Blueberries",
            "White bread",
            "Processed snacks",
            "Soda"
          ]
        },
        {
          question: "How many servings of fruits and vegetables should you eat daily?",
          options: [
            "1-2 servings",
            "3-4 servings",
            "5 or more servings",
            "None"
          ]
        }
      ],
      estimatedTime: "5-7 mins",
      participantCount: 89,
      featured: true
    },
    {
      title: "Caffeine Consumption Survey",
      questions: [
        {
          question: "How many cups of coffee do you drink daily?",
          options: [
            "None",
            "1-2 cups",
            "3-4 cups",
            "5 or more cups"
          ]
        },
        {
          question: "Do you feel jittery after consuming caffeine?",
          options: [
            "Always",
            "Sometimes",
            "Rarely",
            "Never"
          ]
        }
      ],
      estimatedTime: "3-4 mins",
      participantCount: 120,
      featured: false
    },
    {
      title: "Mindful Eating Assessment",
      questions: [
        {
          question: "Do you often eat while distracted?",
          options: [
            "Yes, most meals",
            "Sometimes",
            "Rarely",
            "Never, I eat mindfully"
          ]
        },
        {
          question: "How frequently do you check in with your hunger levels before eating?",
          options: [
            "Before every meal",
            "Sometimes",
            "Rarely",
            "Never"
          ]
        }
      ],
      estimatedTime: "4-6 mins",
      participantCount: 75,
      featured: false
    },
    {
      title: "Gut Health and Mood Survey",
      questions: [
        {
          question: "How often do you consume probiotics?",
          options: [
            "Daily",
            "Few times a week",
            "Occasionally",
            "Never"
          ]
        },
        {
          question: "Do you believe your gut health affects your mood?",
          options: [
            "Strongly agree",
            "Somewhat agree",
            "Somewhat disagree",
            "Strongly disagree"
          ]
        }
      ],
      estimatedTime: "3-5 mins",
      participantCount: 98,
      featured: false
    },
    {
      title: "Nutritional Knowledge Challenge",
      questions: [
        {
          question: "What vitamin is primarily found in citrus fruits?",
          options: [
            "Vitamin C",
            "Vitamin D",
            "Vitamin B12",
            "Vitamin E"
          ]
        },
        {
          question: "Which mineral is essential for bone health?",
          options: [
            "Calcium",
            "Iron",
            "Zinc",
            "Sodium"
          ]
        }
      ],
      estimatedTime: "4-5 mins",
      participantCount: 80,
      featured: false
    }
  ],
experiences:[
  {
    author: {
      name: "Jordan Lee",
      image: "/assets/avatars/avatar1.svg",
      role: "Health Enthusiast"
    },
    title: "Overcoming Stress Eating",
    content: "Mindful eating has truly transformed my relationship with food. By paying attention to my cravings and emotions, I've learned to manage stress without turning to snacks.",
    date: "3 days ago",
    likes: 128,
    comments: 24,
    tags: ["Mindful Eating", "Stress Management", "Healthy Habits"]
  },
  {
    author: {
      name: "Michael Johnson",
      image: "/assets/avatars/avatar2.svg",
      role: "Fitness Coach"
    },
    title: "Keto Diet and Anxiety Relief",
    content: "Making the switch to a keto diet was a game-changer for me. Stabilizing my blood sugar not only helped with my energy but also significantly reduced my anxiety levels.",
    date: "5 days ago",
    likes: 145,
    comments: 31,
    tags: ["Keto Diet", "Anxiety Relief", "Mental Health"]
  },
  {
    author: {
      name: "Emily Carter",
      image: "/assets/avatars/avatar1.svg",
      role: "Nutritionist"
    },
    title: "The Benefits of Meal Prep",
    content: "Meal prepping has been a lifesaver! It saves me time during the week and keeps me on track with my health goals. Plus, I love knowing exactly what I'm eating.",
    date: "1 week ago",
    likes: 95,
    comments: 15,
    tags: ["Meal Prep", "Healthy Eating", "Time Management"]
  },
  {
    author: {
      name: "David Smith",
      image: "/assets/avatars/avatar2.svg",
      role: "Yoga Instructor"
    },
    title: "Finding Peace Through Yoga",
    content: "Yoga has become my sanctuary. It’s not just about the poses; it’s about finding peace and clarity in my mind. It has truly transformed my mental health.",
    date: "2 weeks ago",
    likes: 110,
    comments: 20,
    tags: ["Yoga", "Mental Health", "Wellness"]
  },
  {
    author: {
      name: "Samantha Lee",
      image: "/assets/avatars/avatar1.svg",
      role: "Personal Trainer"
    },
    title: "Strength Training for Beginners",
    content: "Starting strength training was intimidating at first, but it has boosted my confidence like nothing else. I feel stronger and more empowered every day.",
    date: "10 days ago",
    likes: 130,
    comments: 28,
    tags: ["Strength Training", "Fitness", "Confidence"]
  },
  {
    author: {
      name: "Chris Brown",
      image: "/assets/avatars/avatar2.svg",
      role: "Mental Health Advocate"
    },
    title: "Mindfulness and Mental Clarity",
    content: "Incorporating mindfulness into my daily routine has been a revelation. It helps me stay focused and reduces the noise in my head, making life feel more manageable.",
    date: "12 days ago",
    likes: 120,
    comments: 18,
    tags: ["Mindfulness", "Focus", "Mental Clarity"]
  },
  {
    author: {
      name: "Laura White",
      image: "/assets/avatars/avatar1.svg",
      role: "Dietitian"
    },
    title: "Understanding Nutritional Labels",
    content: "Learning to read nutritional labels opened my eyes to what I was really eating. Now, I make informed choices that align with my health goals.",
    date: "15 days ago",
    likes: 140,
    comments: 22,
    tags: ["Nutrition", "Healthy Choices", "Food Labels"]
  },
  {
    author: {
      name: "Kevin Green",
      image: "/assets/avatars/avatar2.svg",
      role: "Wellness Coach"
    },
    title: "The Power of Hydration",
    content: "I never realized how much hydration affects my daily life. Since I started drinking more water, my energy levels have skyrocketed, and I feel so much better overall.",
    date: "20 days ago",
    likes: 160,
    comments: 34,
    tags: ["Hydration", "Energy", "Wellness"]
  }
]


};
