# Jeff Barnes Photography — GitHub Pages edition

This free static portfolio preserves the updated green and pink Jeff Barnes Photography design, responsive gallery, collection filters, search, and enlarged photo viewer. It uses GitHub Pages rather than Netlify. You manage updates using your GitHub account or with help in this chat. There is no website owner login, Google Cloud setup, server, database, subscription, or package installation.

## Publish for free

1. Sign in to GitHub and create a **public** repository named `photography` (or choose another name).
2. Extract this ZIP. Upload its **contents** into the repository's top level. `index.html` must appear at the top level, not inside another folder. Do not upload the ZIP itself.
3. Save the upload with **Commit changes**. The default branch is normally `main`.
4. Open the repository's **Settings → Pages**.
5. Select **Deploy from a branch**, choose **main** and **/(root)**, then **Save**.
6. Wait for the Pages deployment. The Pages settings will display the real website link. With a repository named `photography`, it is normally `https://YOUR-USERNAME.github.io/photography/`.

For a shorter free address, create a repository named exactly `YOUR-USERNAME.github.io`; its site is normally `https://YOUR-USERNAME.github.io/`. A custom .com is optional and requires domain registration separately.

Official publishing instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Add photographs

1. Open the `photos` folder on GitHub. Choose **Add file → Upload files** and upload web-sized JPG, PNG, WebP, or GIF images. Use simple filenames such as `quiet-morning.jpg`.
2. Open `photos.json` in the repository, click the pencil to edit it, and add entries like this:

```json
[
  {
    "title": "Quiet morning",
    "category": "Landscape",
    "url": "photos/quiet-morning.jpg"
  },
  {
    "title": "City reflections",
    "category": "Architecture",
    "url": "photos/city-reflections.jpg"
  }
]
```

Use your real filenames and captions; the example images are not included. Filenames are case-sensitive. Keep image paths relative, starting with `photos/`. Separate entries with commas, and do not add a comma after the last entry. Commit the changes. GitHub publishes them automatically after the next deployment.

To change a caption or collection, edit its entry. To remove an image from the gallery, remove its entry from `photos.json`; to remove the image file too, delete it separately from the repository. Previously committed public files can remain in Git history. Use photographs intended for public display and keep original-resolution backups elsewhere.

You can also send photographs and captions in this chat for an updated set of files to upload. Only someone with write access to the GitHub repository can change the deployed website.

## Current state

The gallery starts empty because no published photo files were included in the supplied deployment ZIP. The existing Netlify site has not been modified. This package is prepared for publishing but is not live until uploaded and Pages is enabled. Relative asset paths support both a root site and a project site such as `/photography/`.

The repository and uploaded photos are public on the free GitHub Pages route. No credentials belong in these files. This version is a portfolio; it does not include a shop, checkout, or booking/payment system.
