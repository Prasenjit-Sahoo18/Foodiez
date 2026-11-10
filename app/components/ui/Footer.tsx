import Link from "next/link";
import { GithubIcon, InstagramIcon, TwitterIcon, WhatsappIcon } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
    return (
        <div className="flex lg:px-36 md:px-20 px-4 md:py-8 py-6 bg-[url(/footer-image.jpg)] text-white lg:min-h-96 md:min-h-84 min-h-72 w-full bg-cover bg-center bg-no-repeat overflow-hidden">
            <div className="flex flex-col lg:gap-10 md:gap-8 gap-6 w-full justify-left items-left m-0 p-0">
                <div className="w-full flex flex-col md:justify-center justify-start md:items-center gap-2">
                    <div><Logo /></div>
                    <div className="text-slate-300 flex md:flex-row flex-col md:gap-2 gap-1 lg:text-[15px] md:text-sm text-xs items-center">
                        <span>Crafted with passion for good food &bull;</span>
                        <span className="text-amber-400 font-medium">Foodiez Restaurant &amp; Delivery</span>
                    </div>
                </div>

                <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 lg:text-md md:text-sm text-xs">
                    <div className="flex flex-col gap-2">
                        <div>Address: 123 Gourmet Boulevard, Food District</div>
                        <div className="flex gap-2">
                            Email:{" "}
                            <a href="mailto:contact@foodiez.com" className="text-gray-300 hover:text-blue-300">
                                contact@foodiez.com
                            </a>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
                            <span>&bull;</span>
                            <Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
                            <span>&bull;</span>
                            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Explore Menu</Link>
                        </div>
                    </div>

                    <div className="flex gap-6 items-center">
                        <div className="flex"><GithubIcon /></div>
                        <div className="flex"><TwitterIcon /></div>
                        <div className="flex"><InstagramIcon /></div>
                        <div className="flex"><WhatsappIcon /></div>
                    </div>

                    <div className="flex justify-between md:w-2/3 w-full text-gray-400 lg:text-sm md:text-xs text-[10px] pt-2 border-t border-gray-700/60">
                        <p>&copy; {new Date().getFullYear()} Foodiez. All rights reserved.</p>

                        <div className="flex md:gap-4 gap-2">
                            <p className="hover:text-white cursor-pointer">Guides</p>
                            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
                            <p className="hover:text-white cursor-pointer">Terms of Service</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
