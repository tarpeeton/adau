"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiGlobe } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

// Define the language type
type Language = { code: string; name: string; icon: string };

const LanguageSwitcher = ({ locale, menu }: { locale: string; menu: boolean }) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown
  let dropdownTimer: NodeJS.Timeout; // Timer for delayed close

  // Define available languages
  const languages: Language[] = [
    { code: "ru", name: "Ру", icon: "fi fi-ru" },
    { code: "uz", name: "Oʻz", icon: "fi fi-uz" },
    { code: "en", name: "Eng", icon: "fi fi-gb" },
  ];

  // Create a function to generate a new URL with the selected locale
  const generateLocalizedPath = (langCode: string) => {
    const segments = pathname.split("/");
    segments[1] = langCode; // Replace the locale in the URL
    return segments.join("/");
  };

  // Handle mouse enter to open dropdown
  const handleMouseEnter = () => {
    clearTimeout(dropdownTimer); // Stop any pending close actions
    setDropdownOpen(true);
  };

  // Handle mouse leave to close dropdown with a delay
  const handleMouseLeave = () => {
    dropdownTimer = setTimeout(() => {
      setDropdownOpen(false);
    }, 250); // Delay closing to avoid flickering
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, []);

  return (
    <div
      className="relative mt-[4px] w-[50px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef} // Attach ref to the dropdown
    >
      {/* Button to toggle dropdown */}
      <button
        id="dropdownDefaultButton"
        className="text-black rounded-lg text-[15px] text-center inline-flex items-center gap-[4px] "
        type="button"
      >
        <CiGlobe className={`text-black font-raleway font-bold ${menu ? '2xl:text-[#222E51]' : 'text-black'}`} size={24} />
        <p className={`text-[15px] md:text-[18px] text-black font-raleway font-bold ${menu ? '2xl:text-[#222E51]' : 'text-black'}`}>
          {locale === "ru" ? "Ру" : locale === "uz" ? "Oʻz" : "Eng"}
        </p>
      </button>

      {/* Dropdown menu */}
      {dropdownOpen && (
        <div
          id="dropdown"
          className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-24 z-[9999]"
        >
          <ul>
            {languages.map((lang) => (
              <li key={lang.code} className="text-[15px] slg:text-[18px] font-raleway font-medium text-black">
                <Link
                  href={generateLocalizedPath(lang.code)}
                  className="px-[8px] py-2 hover:bg-[#222E51] flex font-raleway flex-row gap-[5px] items-center dark:hover:text-white"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className={`fi ${lang.icon} w-4 h-4`} /> {lang.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;