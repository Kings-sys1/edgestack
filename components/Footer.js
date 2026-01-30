export function Footer () {
    const year = new Date().getFullYear()

    return (
        <footer className="px-5 py-5 flex justify-between bg-white inset-shadow-sm">
            <div className="flex gap-2 text-gray-600">
                <p>&copy;{year} Edgestack system</p>
                <p>All rights reserved</p>
            </div>
            <div className="flex gap-2 text-gray-600">
                <p>Privacy policy</p>
                <p>Terms of service</p>
                <p>Support</p>
            </div>
        </footer>
    )
}