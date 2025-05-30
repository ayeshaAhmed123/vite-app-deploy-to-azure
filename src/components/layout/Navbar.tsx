
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from '../../../public/lovable-uploads/Logo.svg';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Providers", path: "/providers" },
    { name: "Services", path: "/services" },
    { name: "How it Works", path: "/how-it-works" },
  ];

  // Track the active button (Sign In or Sign Up)
  const [activeButton, setActiveButton] = useState('signup');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#e0f7ff] to-[#e6e6fa] shadow-md">

      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Octans Care" className="w-[85px] h-[85px]" />
          </Link>
          <nav className="hidden md:flex gap-6 ms-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-[17px] font-semibold", 
                  location.pathname === item.path && "text-blue-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant={activeButton === 'signin' ? 'default' : 'outline'}
            asChild
            onClick={() => setActiveButton('signin')}
          >
            <Link to="/login" className="text-[17px] font-semibold">
              Sign In
            </Link>
          </Button>
          <Button
            variant={activeButton === 'signup' ? 'default' : 'outline'}
            asChild
            onClick={() => setActiveButton('signup')}
          >
            <Link to="/signup" className="text-[17px] font-semibold">
              Sign Up
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#f1f5f9] border-b z-50 animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "py-2 px-3 rounded-md hover:bg-muted transition-colors",
                    location.pathname === item.path && "bg-muted font-medium text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-2 border-t">
              <Button
                variant={activeButton === 'signin' ? 'default' : 'outline'}
                asChild
                className="justify-center w-full"
                onClick={() => setActiveButton('signin')}
              >
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[17px] font-semibold">
                  Sign In
                </Link>
              </Button>
              <Button
                variant={activeButton === 'signup' ? 'default' : 'outline'}
                asChild
                className="justify-center w-full"
                onClick={() => setActiveButton('signup')}
              >
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-[17px] font-semibold">
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};



// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Logo from '../../../public/lovable-uploads/Logo.svg';

// export const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Providers", path: "/providers" },
//     { name: "Services", path: "/services" },
//     { name: "How it Works", path: "/how-it-works" },
//   ];

//   // Track the active button (Sign In or Sign Up)
//   const [activeButton, setActiveButton] = useState('signup');

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-[#9dbbcc] via-[#054a7b] to-[#169c8d] shadow-sm">
//       <div className="container flex h-20 items-center justify-between">
//         <div className="flex items-center gap-6">
//           <Link to="/" className="flex items-center gap-2">
//             <img src={Logo} alt="Octans Care" className="w-[85px] h-[85px]" />
//           </Link>
//           <nav className="hidden md:flex gap-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={cn(
//                   "text-[17px] font-semibold", 
//                   location.pathname === item.path && "text-blue-600"
//                 )}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="hidden md:flex items-center gap-4">
//           <Button
//             variant={activeButton === 'signin' ? 'default' : 'outline'}
//             asChild
//             onClick={() => setActiveButton('signin')}
//           >
//             <Link to="/login" className="text-[17px] font-semibold">
//               Sign In
//             </Link>
//           </Button>
//           <Button
//             variant={activeButton === 'signup' ? 'default' : 'outline'}
//             asChild
//             onClick={() => setActiveButton('signup')}
//           >
//             <Link to="/signup" className="text-[17px] font-semibold">
//               Sign Up
//             </Link>
//           </Button>
//         </div>

//         <button
//           className="md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden fixed inset-x-0 top-16 bg-gradient-to-r from-[#9dbbcc] via-[#054a7b] to-[#169c8d] border-b z-50 animate-fade-in">
//           <div className="container py-4 flex flex-col gap-4">
//             <nav className="flex flex-col gap-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={cn(
//                     "py-2 px-3 rounded-md hover:bg-muted transition-colors",
//                     location.pathname === item.path && "bg-muted font-medium text-primary"
//                   )}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//             <div className="flex flex-col gap-3 pt-2 border-t">
//               <Button
//                 variant={activeButton === 'signin' ? 'default' : 'outline'}
//                 asChild
//                 className="justify-center w-full"
//                 onClick={() => setActiveButton('signin')}
//               >
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[17px] font-semibold">
//                   Sign In
//                 </Link>
//               </Button>
//               <Button
//                 variant={activeButton === 'signup' ? 'default' : 'outline'}
//                 asChild
//                 className="justify-center w-full"
//                 onClick={() => setActiveButton('signup')}
//               >
//                 <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-[17px] font-semibold">
//                   Sign Up
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };
