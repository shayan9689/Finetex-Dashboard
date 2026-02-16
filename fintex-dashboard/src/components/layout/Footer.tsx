export function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto py-4 sm:py-6 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                <p className="text-center sm:text-left">© 2024 Fintex Education. All rights reserved.</p>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
