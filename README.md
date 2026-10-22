# paused-page

A temporary "taking a short break" page for cashridesatl.com. It is not the app.

Every path returns this page with HTTP 503 and `Retry-After`, so search engines treat the pause as temporary.

To bring the real site back, roll production back to the previous deployment in Vercel (Instant Rollback). Don't merge this branch into master.
