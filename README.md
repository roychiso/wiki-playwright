# Technical Assessment for QA Engineer at Ranger

This project is an end-to-end test automation suite built with [Playwright](https://playwright.dev/) using **TypeScript**. It is designed for automated testing of web applications and serves as a submission for a technical assessment.


## 🛠️ Getting Started

### Requirements

-   Node.js v22+
-   npm

### 1. Clone the repository

```bash
git clone git@github.com:roychiso/wiki-playwright.git
cd wiki-playwright
```

### 2. Setup

#### Install dependencies
```bash
npm install
```

#### Install Playwright browsers
```
npx playwright install
```

### 3. Running Tests

#### Run all tests

There's a `test` script in `package.json` so you can do:

```bash
npm run test
```

#### Run a specific test

Add `.only` to the specific test you want to run in isolation in `all.test.ts` and then run the same command:

or use Playwright command:

```bash
npx playwright test <<path>>
```


### 4. Your Tasks

1. Implement a login test and capture the storage state so the remaining tests run as a logged in user
    - In `login.test.ts`, create a test that signs into Wikipedia
    - Create an account if you don't already have one
    - Add your sign in credentials to `.env`
2. Complete the Wikipedia search test
    - In `searchWikipedia.ts`, finish the existing test so that it correctly implements the test case in the file
3. Complete the Wikipedia home page actions test
    - In `wikipediaHomepageActions.ts`, finish the existing test so that it correctly implements the test case in the file
 
### 5. Results

1.  login.tests  ✅
2.  searchWikipedia ❌ Latest update is not Worstbull
3.  wiipediaHomepageActions ✅


### 6. Loom Video
https://www.loom.com/share/1803d2ff882646f4bc6188e48ed0024e?sid=4712dcae-bc09-4220-b7d7-6f109031fbb2