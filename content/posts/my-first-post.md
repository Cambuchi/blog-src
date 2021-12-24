---
title: 'Build a blog with CMS & Git functionality '
date: 2021-12-22T13:53:01.000-08:00
tags:
- Blog
- CMS
- Git
- Hugo
- Forestry.io
- GitHub
- Web Development
- Hosting
- Development
- Free
showToc: true
TocOpen: false
hidemeta: false
comments: false
description: How to build and host a free blog with a content management system (CMS)
  for content creation that doesn't require diving into code or managing markdown
  files.
canonicalURL: https://canonical.url/to/page
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
cover:
  image: uploads/blog-build-banner.jpg
  alt: The blog build tech stack
  caption: With Hugo, Github Pages, & Forestry we can create a fully featured site.
  relative: false
  hidden: false
editPost:
  URL: https://github.com/Cambuchi/blog-src/blob/main/content
  Text: Suggest Changes
  appendFilePath: true

---
# Introduction

When it comes to building a blog/portfolio site, beginners are often directed to services like WordPress or Squarespace. This is understandable, as these closed systems guide you through the entire creation process. Past this beginner plateau however, the difficulty in creating a fully customizable site with all the bells and whistles increases dramatically.

After reading this [thread](https://www.reddit.com/r/webdev/comments/rlsxqk/if_i_was_going_to_create_my_own_blog_website_what/) on reddit I realized that even for people with web development experience, the lack of easily available instructions have many defaulting back to this beginner step as well. If you think more advanced web-content creation involves diving into code or crafting HTML for every post, then the editors on website building services would indeed seem very appealing. However I am here to tell you that this is not the case, and that similar tools and easy to use workflows are available for custom built sites as well.

This guide aims to create a guided "mid-tier" plateau that those beginning their web development journey can reference to help them move beyond standard website builders.

# Why?

1. **Free**
   * From beginning to end, this entire process is free. This blog you are looking at right now was made for free and does not cost anything to host.
   * If you want your own custom domain then you would have to pay for that, but GitHub Pages is already set up to fully support custom domains.
2. **Easy content creation with a CMS**
   * Making content is just as easy as website builders. You get a fully functional text/markdown editor that automatically commits to your sites repository.
   * No need to open code or edit HTML just to make a new post.
   * Here is an example of me making a new post for my blog:

![making a new post in forestry](uploads/buildsite.gif "making a new post in forestry")

3. **Easy to use/workflow**
   * Create content on forestry (this commits to your repository)
   * Run a script that does the following
     1. Pull update from repository into your build directory
     2. Build site using Hugo
     3. Add, commit, and push changes to your repository
   * GitHub Pages detects that you made changes and automatically updates your site within minutes.
   * After creating the content, it takes me less than 30 seconds to update my site with the new post.
4. **Easy to set-up**
   * Hugo and Hugo Themes do all of the heavy lifting for generating your website.
   * No need to build all the logic and HTML for tags. categories, search functionality, syntax highlighting, etc. Generating a site and getting it online can be done in less than an hour.
5. **Customization**
   * Since everything is HTML and JavaScript, changing the site layout and little details is completely under your control. No more default footers advertising WordPress or Squarespace on your site.
   * Toggle or button not where you want it? Moving elements around and custom CSS is easily done in the Hugo framework.

