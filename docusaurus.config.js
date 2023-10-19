// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/nightOwlLight");
const darkCodeTheme = require("prism-react-renderer/themes/nightOwlLight");

const organizationName = "GlobalPass-AG";
const projectName = "docs";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Developer GlobalPass",
  // tagline: 'GlobalPass developers are cool',
  favicon: "https://cdn.globalpass.ch/assets/favicon_globalpass.ico",
  organizationName,
  projectName,
  // Set the production url of your site here
  url: "https://developer.globalpass.ch",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${projectName}/`,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          // showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        // title: '',
        logo: {
          alt: "GlobalPass Developer Logo",
          src: "http://cdn.globalpass.ch/assets/logo_gp.svg"
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "apiIntegrationGuideSidebar",
            position: "left",
            label: "API Integration Guide",
          },
          {
            type: "docSidebar",
            sidebarId: "androidSdkSidebar",
            position: "left",
            label: "Android SDK",
          },
          {
            type: "docSidebar",
            sidebarId: "iosSdkSidebar",
            position: "left",
            label: "iOS SDK",
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'androidSdkSidebar',
          //   label: 'SDK',
          //   position: 'left',
          //   items: [
          //     {
          //       type: 'docSidebar',
          //       sidebarId: 'androidSdkSidebar',
          //       label: 'Android'
          //     },
          //     {
          //       type: 'docSidebar',
          //       sidebarId: 'iosSdkSidebar',
          //       label: 'iOS'
          //     },
          //   ]
          // },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'apiSidebar',
          //   position: 'left',
          //   label: 'API'
          // },
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GlobalPass.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [
          "kotlin",
          "swift",
          "gradle",
          "dart",
          "groovy",
          "java",
          "ruby",
        ],
      },
      colorMode: {
        disableSwitch: true,
        defaultMode: "light",
      },
    }),
};

module.exports = config;
