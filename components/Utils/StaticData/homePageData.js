export const homePageSampleData = [
    {
      index: 0, is_active: true, label: 'main_banner', body: {
        title: 'The best Gym in Dubai & Sharjah !',
        desc: 'Access them all with one subscription !'
      }
    },
    {
      index: 1, is_active: true, label: 'three_col', body: {
        col1: { title: 'Gym Access!', desc: 'Get access to 29 gyms spread over Dubai & Sharjah for AED 299 per month!' },
        col2: { title: 'Book Classes!', desc: "Book classes at Dubai's most famous fitness clubs!" },
        col3: { title: 'Personal Training!', desc: 'Book sessions with the best trainers in the UAE!' },
      },
    },
    {
      index: 2, is_active: true, label: 'text_img_section', body: {
        title: 'About Us!', sub_title: 'We offer affordable access to the best fitness institutions in the UAE!',
        desc: 'We have been working quietly since May 2019 to bring the best fitness experience to the UAE!', btn_text: 'More About Us!'
      }
    },
    {
      index: 3, is_active: true, label: 'slider_section', body: {
        title: 'We have partnered with some of the Fitness Institutions!',
        imgs_arr: [

          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
          // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        ],
      },
    },
    {
      index: 4, is_active: true, label: 'why_us_section', body: {
        right_section: {
          title: 'YOUR BENEFITS!',
        },
        left_section: {
          title: 'Why Choose Us!',
          desc: 'We offer affordable access to the best fitness institutions in the UAE!',
          dynamic_section: {
            right_col: [
              { heading: '50+ Locations!', sub_heading: 'Access any of our locations once per day with one subscription!' },
              { heading: '50+ GYMS!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
              { heading: '50+ Locations!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
            ],
            left_col: [
              { heading: '50+ Locations!', sub_heading: 'Access any of our locations once per day with one subscription!' },
              { heading: '50+ GYMS!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
              { heading: '50+ Locations!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
            ],
          },
        },
      },
    },
    {
      index: 5, is_active: true, label: 'pricing_section', body: {
        heading: '',
        sub_heading: '',
        plans_section: [
          {
            access: 'Gym Access',
            plan: 'Pro Plan',
            price: 'AED299',
            duration: 'monthly',
            features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees', 'Cancel Anytime', 'Exclusive Member Benefits'],
          },
          {
            access: 'Gym Access',
            plan: 'Pro Plan',
            price: 'AED299',
            duration: 'monthly',
            features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees'],
          },
          {
            access: 'Gym Access',
            plan: 'Pro Plan',
            price: 'AED299',
            duration: 'monthly',
            features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees', 'Cancel Anytime'],
          },
        ],
      },
    },
    {
      index: 6, is_active: true, label: 'responsive_banner', body: {
        desktop_banner_text: 'Get started today!',
        desktop_btn_text: 'Join Now!',
        mobile_btn_text: 'Join Now!',
        mobile_banner_text: 'Get started today!',
      },
    },
    // {
    //   index: 7, is_active: true, label: 'articles_section', body: {
    //     title: 'Our Recent Articles!',
    //     desc: 'Gain access to Dubai\'s best collection of boutique gyms for one low monthly price!',
    //     imgs_arr: [
    //       { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body!', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
    //       { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
    //       { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body!', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
    //     ],
    //   },
    // },
    // { index: 10, label: "main_banner", chosen: false, body: { title: 'some', desc: 'lorum psummsda' }, is_active: true, selected: false, }
  ];

export const homePageAvailableSections = [
  // 
  {
    index: 0, label: 'main_banner', body: {
      title: '',
      desc: ''
    }
  },
  {
    index: 1, label: 'three_col', body: {
      col1: { title: 'Gym Access!', desc: 'Get access to 29 gyms spread over Dubai & Sharjah for AED 299 per month!' },
      col2: { title: 'Book Classes!', desc: "Book classes at Dubai's most famous fitness clubs!" },
      col3: { title: 'Personal Training!', desc: 'Book sessions with the best trainers in the UAE!' },
    }
  },
  {
    index: 2, label: 'text_img_section', body: {
      title: 'About Us!', sub_title: 'We offer affordable access to the best fitness institutions in the UAE!',
      desc: 'We have been working quietly since May 2019 to bring the best fitness experience to the UAE!', btn_text: 'More About Us!'
    }
  },
  {
    index: 3, label: 'slider_section', body: {
      title: 'We have partnered with some of the Fitness Institutions!',
      imgs_arr: [
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
        // { slideHeading: 'Fit Boys Marina!', slidePara: 'Marina, Dubai!' },
      ],
    },
  },
  {
    index: 4, label: 'why_us_section', body: {
      right_section: {
        title: 'YOUR BENEFITS!',
      },
      left_section: {
        title: 'Why Choose Us!',
        desc: 'We offer affordable access to the best fitness institutions in the UAE!',
        dynamic_section: {
          right_col: [
            { heading: '50+ Locations!', sub_heading: 'Access any of our locations once per day with one subscription!' },
            { heading: '50+ GYMS!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
            { heading: '50+ Locations!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
          ],
          left_col: [
            { heading: '50+ Locations!', sub_heading: 'Access any of our locations once per day with one subscription!' },
            { heading: '50+ GYMS!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
            { heading: '50+ Locations!', sub_heading: 'Access any of our gyms once per day with one subscription!' },
          ],
        },
      },
    },
  },
  {
    index: 5, label: 'pricing_section', body: {
      heading: '',
      sub_heading: '',
      plans_section: [
        {
          access: 'Gym Access',
          plan: 'Pro Plan',
          price: 'AED299',
          duration: 'monthly',
          features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees', 'Cancel Anytime', 'Exclusive Member Benefits'],
        },
        {
          access: 'Gym Access',
          plan: 'Pro Plan',
          price: 'AED299',
          duration: 'monthly',
          features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees'],
        },
        {
          access: 'Gym Access',
          plan: 'Pro Plan',
          price: 'AED299',
          duration: 'monthly',
          features: ['Access to 50+ Locations', 'Visit any location once per day', 'No Joining Fees', 'Cancel Anytime'],
        },
      ],
    },
  },
  {
    index: 6, label: 'responsive_banner', body: {
      desktop_banner_text: 'Get started today!',
      desktop_btn_text: 'Join Now!',
      mobile_btn_text: 'Join Now!',
      mobile_banner_text: 'Get started today!',
    }
  },
  {
    index: 7, label: 'articles_section', body: {
      title: 'Our Recent Articles!',
      desc: 'Gain access to Dubai\'s best collection of boutique gyms for one low monthly price!',
      imgs_arr: [
        { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body!', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
        { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
        { captionArticles: 'Lorem Ipsum Dollar', titleArticles: 'How hiking helps the body!', paraArticle: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore …', btnLinkArticle: '' },
      ],
    },
  },
];