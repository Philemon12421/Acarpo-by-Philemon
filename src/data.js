// ---------------------------------------------------------------------------
// All editable site content lives here. Add a blog post, tweak a lesson,
// change an accent color \u2014 you never need to touch App.jsx for content edits.
// ---------------------------------------------------------------------------

export const ROADMAPS = {
  cybersecurity: {
    title: 'Cybersecurity Fundamentals',
    subtitle: 'From security basics to hardening a real app',
    accent: '#4338CA',
    iconName: 'Shield',
    nodes: [
      { id: 1, title: 'Security Mindset 101', desc: 'Threat modeling: assets, actors, attack surfaces.',
        content: [
          'Every security decision starts with the same question: what are you actually protecting, and from whom? An asset is anything worth protecting \u2014 data, credentials, uptime, reputation. A threat actor is anyone motivated to go after it, from an opportunistic script kiddie to a targeted attacker.',
          'Threat modeling just means mapping assets to the actors who might want them and the paths they would take to get there. Do this before writing a line of defensive code, and the rest of a security roadmap starts making sense as answers to specific threats instead of a checklist.',
        ] },
      { id: 2, title: 'Password & Auth Hygiene', desc: 'Hashing, salting, MFA \u2014 and why weak reuse fails.',
        content: [
          'Passwords should never be stored in plain text. A hash function turns a password into a fixed-length string that can\u2019t be reversed, and a unique salt per user stops attackers from precomputing rainbow tables against your whole user base at once.',
          'Even a perfectly hashed password fails the moment a user reuses it on a site that gets breached. Multi-factor authentication (MFA) is the practical fix: even a leaked password is useless without the second factor, whether that\u2019s a code, a key, or a push approval.',
        ] },
      { id: 3, title: 'Network Fundamentals', desc: 'TCP/IP, firewalls, and how traffic actually moves.',
        content: [
          'Most attacks travel over the same protocols that carry ordinary traffic. Understanding how TCP/IP establishes a connection, and how a firewall decides what to let through based on ports and rules, is what lets you read a security alert and know if it\u2019s real.',
          'A firewall is a filter, not a fortress \u2014 it only blocks what it\u2019s configured to block. Combined with network segmentation (keeping sensitive systems on their own isolated network segment), it turns "one breach" into "one contained incident."',
        ] },
      { id: 4, title: 'OWASP Top 10 Overview', desc: 'The most common web app vulnerability classes.',
        content: [
          'The OWASP Top 10 is a community-maintained list of the web vulnerability categories that show up again and again in real breaches \u2014 broken access control, injection, cryptographic failures, and more. It\u2019s less a rulebook than a map of where bugs actually live.',
          'Treat it as a checklist to run against your own app: for each category, ask "could this happen here, and how would I know?" That question alone catches more real bugs than most automated scanners.',
        ] },
      { id: 5, title: 'SQL Injection & Input Validation', desc: 'How injection happens, and how parameterized queries stop it.',
        content: [
          'SQL injection happens when user input gets concatenated directly into a database query instead of being treated as pure data. If a form field\u2019s contents can change the structure of the query being run, an attacker can read, modify, or delete data they were never meant to touch.',
          'The fix isn\u2019t "sanitize the input harder" \u2014 it\u2019s parameterized queries (prepared statements), which keep user input in a data slot the database engine can never interpret as code. Paired with least-privilege database accounts, this closes the door almost entirely.',
        ] },
      { id: 6, title: 'Cross-Site Scripting (XSS)', desc: 'Stored vs reflected XSS, and safe output encoding.',
        content: [
          'XSS happens when untrusted input gets rendered back into a page as executable script instead of inert text. Reflected XSS bounces off a single request (like a malicious search query); stored XSS is worse \u2014 the payload sits in your database and fires for every visitor who views it.',
          'The core defense is output encoding: escape user content for the context it\u2019s rendered in (HTML, attribute, JS) so a browser can never mistake data for code. Modern frameworks do this by default \u2014 the risk shows up when a developer opts out for "just this one field."',
        ] },
      { id: 7, title: 'Social Engineering & Phishing', desc: 'Spotting pretexting, spoofed domains, urgency tricks.',
        content: [
          'The weakest link in most breaches isn\u2019t a firewall \u2014 it\u2019s a person under time pressure. Social engineering exploits trust and urgency: a fake invoice, a spoofed IT request, a "your account will be locked in 10 minutes" email designed to short-circuit careful thinking.',
          'The tell is almost always a mismatch: a sender domain that\u2019s close but not quite right, a request that skips normal process, or urgency that discourages verification. Slowing down and verifying through a separate channel defeats the vast majority of these attempts.',
        ] },
      { id: 8, title: 'Incident Response Basics', desc: 'Contain, eradicate, recover \u2014 the first-hour checklist.',
        content: [
          'When something goes wrong, the instinct to immediately fix everything is usually the wrong one. The first move is containment: stop the bleeding without destroying evidence you\u2019ll need to understand what happened.',
          'From there, the standard flow is eradicate (remove the actual cause), recover (restore normal operation), and review (a blameless retrospective on what let it happen and how to close that gap). Having this order memorized before an incident is what keeps a bad day from becoming a bad month.',
        ] },
      { id: 9, title: 'Capstone: Harden a Sample App', desc: 'Apply it all to lock down a deliberately vulnerable demo.', capstone: true,
        content: [
          'This is where the previous eight lessons stop being theory. Take a small, deliberately vulnerable sample app and work through it end to end: fix the injection points, add MFA, encode output correctly, and segment anything sensitive.',
          'Document what you changed and why for each fix \u2014 that write-up is the actual skill. Anyone can patch a known bug; being able to explain the underlying vulnerability class is what transfers to the next app you work on.',
        ] },
    ],
  },
  ai: {
    title: 'AI & Machine Learning',
    subtitle: 'From prompting basics to shipping an AI feature',
    accent: '#7C3AED',
    iconName: 'Brain',
    nodes: [
      { id: 1, title: 'What LLMs Actually Do', desc: 'Tokens, context windows, and why models hallucinate.',
        content: [
          'A large language model doesn\u2019t "know" facts the way a database does \u2014 it predicts the most likely next token based on patterns learned from training data. That\u2019s powerful for language tasks, but it explains why a model can state something false with total confidence: it\u2019s optimizing for plausible text, not verified truth.',
          'The context window is everything the model can "see" at once \u2014 your prompt plus its own prior output. Once something falls outside that window, the model has no memory of it unless you put it back in.',
        ] },
      { id: 2, title: 'Prompting Fundamentals', desc: 'Clear instructions, examples, and structured output.',
        content: [
          'The biggest lever in prompting is specificity. "Write about dogs" gives the model almost nothing to work with; "write a 100-word product description for a dog harness, aimed at first-time owners" gives it a target to hit.',
          'Examples do more work than most people expect \u2014 showing the model one or two examples of the exact output format you want (few-shot prompting) reliably outperforms describing the format in prose.',
        ] },
      { id: 3, title: 'Retrieval-Augmented Generation', desc: 'Grounding responses in your own documents.',
        content: [
          'RAG solves a simple problem: a model\u2019s training data is frozen and doesn\u2019t include your private documents. Instead of retraining the model, RAG retrieves the most relevant chunks of your own data at query time and hands them to the model as context.',
          'The quality of a RAG system lives or dies on retrieval, not generation \u2014 if the wrong chunks get pulled in, no amount of prompting fixes a model answering from the wrong source material.',
        ] },
      { id: 4, title: 'Tool Use & Agents', desc: 'Letting a model call functions and take actions.',
        content: [
          'Tool use lets a model go beyond generating text \u2014 it can call a defined function (search the web, query a database, send an email) and use the result to inform its next step. This is what turns a chatbot into something that can actually get things done.',
          'An "agent" is just a model given tools and allowed to loop: plan, call a tool, observe the result, decide the next step. The design challenge is less about the model and more about which actions you\u2019re comfortable letting it take without a human checking first.',
        ] },
      { id: 5, title: 'Evaluating Model Output', desc: 'Building test sets so quality is measurable.',
        content: [
          'Without a test set, "did that prompt change help?" is just a feeling. A good eval set is a fixed collection of realistic inputs with either a known correct answer or clear grading criteria, run consistently every time you change a prompt or model.',
          'Start small \u2014 even 20 well-chosen examples covering your trickiest edge cases beats a vague sense that "it seems better." Track results over time so regressions are visible instead of anecdotal.',
        ] },
      { id: 6, title: 'Capstone: Ship an AI Feature', desc: 'Wire a model into a real product flow.', capstone: true,
        content: [
          'Pick one real, bounded task \u2014 summarizing support tickets, drafting email replies, tagging content \u2014 and wire a model into that single flow end to end, including error handling for when the model output is empty, malformed, or wrong.',
          'Ship it behind a feature flag, watch real usage, and keep the eval set from the previous lesson running against it. The gap between a demo and a shipped feature is almost entirely in that unglamorous edge-case handling.',
        ] },
    ],
  },
  design: {
    title: 'Graphic Design Essentials',
    subtitle: 'From color theory to a portfolio-ready piece',
    accent: '#D97706',
    iconName: 'Palette',
    nodes: [
      { id: 1, title: 'Color Theory Basics', desc: 'Contrast, harmony, and building a palette that works.',
        content: [
          'Color isn\u2019t decoration \u2014 it\u2019s the fastest signal a design sends. Contrast is what makes text readable and elements distinguishable; harmony is what keeps a palette from feeling random. Most working palettes are built from 4\u20136 colors: a dominant, a couple of supporting tones, and one accent used sparingly.',
          'Pick your accent last, not first. Nail the neutral base of a palette before deciding what single color gets to demand attention \u2014 an accent only works because everything around it is quiet.',
        ] },
      { id: 2, title: 'Typography Foundations', desc: 'Pairing typefaces and setting a real type scale.',
        content: [
          'Two typefaces is usually the right number: a display face with personality for headlines, used sparingly, and a highly legible body face for everything else. Pairing the same family for both roles almost always reads as safe rather than intentional.',
          'A type scale is a fixed set of sizes (not arbitrary pixel values chosen per element) that keeps a layout consistent. Once you\u2019ve set one, every heading and paragraph pulls from it instead of being eyeballed.',
        ] },
      { id: 3, title: 'Layout & Grid Systems', desc: 'Structuring a page so the eye knows where to go.',
        content: [
          'A grid is an invisible structure that aligns elements so a layout feels deliberate instead of scattered. It doesn\u2019t need to be rigid \u2014 breaking the grid on purpose for one element is a common way to create emphasis, but only once the reader has learned what "normal" looks like.',
          'Whitespace is part of the grid, not what\u2019s left over after placing content. Generous spacing around a focal element is often what makes it feel important, more than size or color does.',
        ] },
      { id: 4, title: 'Branding & Identity', desc: 'Logos, marks, and consistent visual voice.',
        content: [
          'A brand identity is a system, not a logo. The mark matters, but what makes an identity recognizable across contexts is the consistent use of the same palette, type, and tone of voice everywhere the brand shows up.',
          'Design for the smallest and most awkward use case first \u2014 a favicon, a business card, a single-color print job. A mark that survives those constraints will look even better everywhere else.',
        ] },
      { id: 5, title: 'Capstone: Design a Brand Kit', desc: 'Ship a small, cohesive identity system.', capstone: true,
        content: [
          'Put it together: a logo mark, a 4\u20136 color palette, a type pairing, and 3\u20134 example applications (business card, social post, simple webpage). The goal isn\u2019t volume \u2014 it\u2019s proving the system holds together across different formats.',
          'Write one sentence describing who this brand is for and what it should feel like before you touch color or type. Every choice after that should trace back to that sentence.',
        ] },
    ],
  },
  tools: {
    title: 'Tools & Productivity Tips',
    subtitle: 'The workflow shortcuts that actually save time',
    accent: '#059669',
    iconName: 'Wrench',
    nodes: [
      { id: 1, title: 'Keyboard-First Workflows', desc: 'Cutting mouse trips out of your daily routine.',
        content: [
          'Every trip to the mouse and back costs a fraction of a second of focus, and it adds up over a full day. Learning the handful of keyboard shortcuts you use constantly \u2014 window switching, search, common app actions \u2014 pays for itself within a week.',
          'Don\u2019t try to learn twenty shortcuts at once. Pick the three actions you repeat most often today, learn those, and let the rest come naturally as friction shows up.',
        ] },
      { id: 2, title: 'Automation Basics', desc: 'When a script beats a repeated manual task.',
        content: [
          'Not everything repeated is worth automating \u2014 a rough rule of thumb is: if a task takes under a minute and happens rarely, doing it by hand is fine. If it happens daily or the steps are error-prone, that\u2019s a signal to script it.',
          'Start with the smallest possible automation, even a five-line script, rather than trying to build the perfect general tool. A working shortcut you actually use beats a polished one you never finish.',
        ] },
      { id: 3, title: 'Version Control Habits', desc: 'Commits, branches, and not fearing git.',
        content: [
          'A commit is a checkpoint, not a formality. Small, frequent commits with a clear message ("fix login redirect bug" beats "updates") make it possible to find exactly when and why something changed, months later.',
          'Branches exist so you can experiment without risking working code. Treat your main branch as always deployable, and do anything uncertain on a separate branch you can throw away if it doesn\u2019t work out.',
        ] },
      { id: 4, title: 'Capstone: Automate a Chore', desc: 'Build one real automation you\u2019ll keep using.', capstone: true,
        content: [
          'Find one task you actually do every week \u2014 renaming files, formatting a report, backing something up \u2014 and automate exactly that, nothing more. The best capstone here is boring: something you\u2019ll genuinely keep running.',
          'Once it works, spend five minutes writing down what it does and why, in plain language. Future-you (or a teammate) will thank present-you the first time it breaks.',
        ] },
    ],
  },
};

export const BLOG_POSTS = [
  { id: 1, cat: 'Cybersecurity', accent: '#4338CA', title: 'SQL Injection, Explained Without the Jargon',
    excerpt: 'What actually happens when input isn\u2019t sanitized, and why parameterized queries fix it for good.',
    author: 'Philemon', readTime: '5 min read', date: 'Jul 12, 2026', seed: 'cyber1',
    content: [
      'Picture a login form that builds a database query by gluing your username straight into a string. Under normal use, that\u2019s invisible \u2014 the username slots in, the query runs, everyone moves on. The problem shows up the moment someone types something that isn\u2019t just a username.',
      'If an attacker enters a value that includes database syntax, and that value gets concatenated directly into the query, the database can\u2019t tell the difference between "data" and "instructions." A cleverly crafted input can turn a simple lookup into a command that dumps an entire user table, or bypasses a login check entirely.',
      'The fix is parameterized queries (also called prepared statements). Instead of building a query as one string, you define the query structure separately from the values, and hand the values to the database as data \u2014 never as code. Every modern database library supports this, and it closes the door almost completely. Input validation is still worth doing, but it\u2019s a second layer, not the fix.',
    ] },
  { id: 2, cat: 'Cybersecurity', accent: '#4338CA', title: 'Phishing Emails: The Five Tells',
    excerpt: 'Domain spoofing, urgency language, and other patterns worth training your eye on.',
    author: 'Philemon', readTime: '4 min read', date: 'Jul 8, 2026', seed: 'cyber2',
    content: [
      'Most phishing emails aren\u2019t sophisticated \u2014 they rely on you reading fast and not checking. A handful of patterns show up again and again, and once you know them, they\u2019re easy to spot.',
      'First, the sender domain: a lookalike domain (like "micros0ft-support.com") banking on you not reading closely. Second, artificial urgency \u2014 "act within 24 hours or your account is locked" is designed to make you skip verification. Third, a generic greeting on an email that claims to be personal or urgent. Fourth, a mismatch between the display name and the actual email address. Fifth, a link where the visible text doesn\u2019t match where it actually points.',
      'The single most reliable defense is process, not vigilance: never act on a request for credentials or payment by clicking through the email itself. Open a new tab, navigate to the real site directly, or call the person through a number you already had \u2014 not one in the email.',
    ] },
  { id: 3, cat: 'AI & ML', accent: '#7C3AED', title: 'Prompting Like You Mean It',
    excerpt: 'Structure, examples, and constraints \u2014 the three levers that actually move output quality.',
    author: 'Philemon', readTime: '6 min read', date: 'Jul 15, 2026', seed: 'ai1',
    content: [
      'Most disappointing model output traces back to an underspecified prompt, not a weak model. Three changes consistently move quality more than anything else: adding structure, adding examples, and adding explicit constraints.',
      'Structure means telling the model the shape of what you want \u2014 headings, a specific order, a word count \u2014 rather than describing the topic and hoping. Examples (showing one or two instances of the exact output format) do more work than a paragraph of instructions describing that same format. Constraints close off the wrong answers: "don\u2019t use technical jargon" or "keep it under 100 words" removes entire categories of bad output before they happen.',
      'The habit worth building is treating your first prompt as a draft. Read the output, notice what\u2019s wrong, and fix the prompt \u2014 not just the output \u2014 so the next generation doesn\u2019t make the same mistake.',
    ] },
  { id: 4, cat: 'AI & ML', accent: '#7C3AED', title: 'RAG in Plain English',
    excerpt: 'How retrieval-augmented generation keeps a model grounded in your own data.',
    author: 'Philemon', readTime: '5 min read', date: 'Jul 3, 2026', seed: 'ai2',
    content: [
      'A model only knows what it saw during training, which means it knows nothing about your internal docs, your product\u2019s latest changes, or anything written after its cutoff. Retrieval-augmented generation (RAG) works around that without retraining anything.',
      'At query time, a RAG system searches your own documents for the chunks most relevant to the question, and hands those chunks to the model as extra context alongside the question itself. The model then answers using what it was just given, rather than guessing from memory.',
      'The part that actually determines quality is retrieval, not the model. If the search step pulls in the wrong document chunks, the model will confidently answer from the wrong material \u2014 which is why most RAG debugging time goes into improving what gets retrieved, not tweaking the prompt.',
    ] },
  { id: 5, cat: 'Graphic Design', accent: '#D97706', title: 'Picking a Palette That Isn\u2019t Generic',
    excerpt: 'A quick framework for choosing 4\u20136 colors that actually say something.',
    author: 'Philemon', readTime: '4 min read', date: 'Jun 29, 2026', seed: 'design1',
    content: [
      'A lot of palettes end up generic because they\u2019re chosen backwards: pick a pretty accent color first, then build neutrals around it. The result usually looks like every other product using the same trending color.',
      'Try the opposite order. Nail your neutrals first \u2014 a background, a text color, a couple of grays for borders and secondary text \u2014 and get those feeling right on their own before you add anything else. Only then choose one accent, and choose it for a reason specific to what you\u2019re designing, not because it\u2019s currently popular.',
      'Test the palette in grayscale before finalizing it. If the layout doesn\u2019t hold together without color, the palette is doing work that the layout and type should be doing instead.',
    ] },
  { id: 6, cat: 'Graphic Design', accent: '#D97706', title: 'Type Pairing 101',
    excerpt: 'How to combine a display face and a body face without it looking accidental.',
    author: 'Philemon', readTime: '5 min read', date: 'Jun 24, 2026', seed: 'design2',
    content: [
      'Good type pairing usually comes from contrast, not similarity. Two typefaces that are almost identical tend to look like a mistake, while a characterful display face paired with a plain, highly legible body face reads as intentional.',
      'A reliable starting point: choose your body face first, since it carries the most text and needs to be comfortable to read at length. Then pick a display face for headlines that contrasts in weight or style \u2014 a bold geometric sans against a body serif, or vice versa.',
      'Limit yourself to two families and lean on weight, size, and spacing within each one to create variety. Adding a third typeface rarely adds personality \u2014 it usually just adds noise.',
    ] },
  { id: 7, cat: 'Tools', accent: '#059669', title: 'Automate the Boring 20%',
    excerpt: 'A simple test for deciding when a repeated task is worth scripting.',
    author: 'Philemon', readTime: '3 min read', date: 'Jun 18, 2026', seed: 'tools1',
    content: [
      'Not every repeated task deserves a script. Building and maintaining automation has a real cost, so it\u2019s worth a quick gut check before reaching for it: how often does this happen, and how error-prone is it by hand?',
      'A task that takes thirty seconds and happens once a month almost never pays back the time spent automating it. A task that takes five minutes, happens daily, and is easy to get slightly wrong is exactly the kind worth scripting \u2014 the payback shows up within the first week.',
      'Start small. A five-line script that handles the common case is more valuable than a fully general tool you never finish building.',
    ] },
  { id: 8, cat: 'Tools', accent: '#059669', title: 'Git Habits That Save Future You',
    excerpt: 'Small commit discipline that makes debugging six months from now painless.',
    author: 'Philemon', readTime: '4 min read', date: 'Jun 10, 2026', seed: 'tools2',
    content: [
      'A commit history is a message to your future self, and most people write it as an afterthought. "Fixed stuff" tells you nothing six months later when you\u2019re trying to find when a bug was introduced.',
      'Commit small, logically complete changes with a message that explains what changed and, briefly, why. "Fix off-by-one error in pagination count" is searchable and useful; "updates" is neither.',
      'Branches are cheap \u2014 use them liberally for anything uncertain, and keep your main branch always in a working, deployable state. That discipline alone prevents most of the "wait, when did this break" investigations.',
    ] },
];
