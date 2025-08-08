# Problems List

A Vue 3 app that displays programming problems from the KEP.uz API. Built for a UZINFOCOM internship test task.

## Features

- Display problems with ID, title, tags, difficulty, likes/dislikes, and attempts
- Search by problem title
- Filter by solution availability and checker availability  
- Sort by ID or title
- Pagination with first/prev/next/last navigation

## Tech Stack

- Vue 3 with Composition API
- Vite
- Tailwind CSS
- Pinia (state management)

## Setup

```bash
npm install
npm run dev
```

## API

Fetches data from `https://kep.uz/api/problems/` with query parameters for pagination, search, and filtering.
