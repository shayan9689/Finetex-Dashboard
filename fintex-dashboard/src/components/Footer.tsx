export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
                <p>© 2024 Fintex Education. All rights reserved.</p>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
