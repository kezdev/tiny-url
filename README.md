# URL Shortener 🌐✂️

A user-friendly URL shortening service built with **Laravel** and **React**.


## 🚀 Demo
You can access the live demo [here](https://qlpcq.nimsite.uk/).

## 🛠️ Tech Stack

- **Backend**: Laravel [🔗](https://laravel.com/)
- **Frontend**: React [🔗](https://react.dev/) 
- **Styling**: Tailwind CSS [🔗](https://tailwindcss.com/) 
- **Icons**: Heroicons [🔗](https://laravel.com/) 
- **Notifications**: react-hot-toast [🔗](https://react-hot-toast.com/) 
- **Animations**: framer-motion [🔗](https://motion.dev/)

## ⚙️ Setup

1. Clone the repository
2. Install dependencies by running `composer install` and `npm install`
3. copy `.env.example` to `.env` and set your database credentials
4. Run `php artisan key:generate`
5. Run `php artisan migrate`
6. Run `php artisan serve`
7. Run `npm run dev`

You can now access the application at `http://localhost:8000`


## 💡 Future Features

- 💡 Implement the option to create custom short URLs
- 💡 Introduce a safety delay screen before redirecting to the original URL
- 💡 Add a feature to track and display the number of clicks on each shortened URL
